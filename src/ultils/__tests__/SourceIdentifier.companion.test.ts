import * as dto from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "../companions/SourceIdentifier.companion";

describe("SourceIdentifierCompanion", () => {
  describe("fromUrlOrShorthand", () => {
    describe(".git suffix stripping", () => {
      test("should strip .git suffix from repository URLs", () => {
        const testUrls = [
          "https://github.com/apache/commons-bcel.git",
          "https://github.com/apache/commons-beanutils.git",
          "apache/commons-collections.git",
        ];

        testUrls.forEach((url) => {
          const result = SourceIdentifierCompanion.fromUrlOrShorthand(url);
          expect(typeof result).toBe("object");

          if (typeof result === "object" && result !== null && "name" in result) {
            const repo = result as dto.RepositoryId;
            // Critical: Repository name must NOT contain .git when sent to backend
            expect(repo.name).not.toContain(".git");
            expect(repo.name.endsWith(".git")).toBe(false);
          }
        });
      });

      test("should strip .git from the exact URLs mentioned in the issue", () => {
        const issueUrls = [
          "https://github.com/apache/commons-bcel.git",
          "https://github.com/apache/commons-beanutils.git",
        ];

        issueUrls.forEach((url) => {
          const result = SourceIdentifierCompanion.fromUrlOrShorthand(url);
          expect(typeof result).toBe("object");

          if (typeof result === "object" && result !== null && "name" in result) {
            const repo = result as dto.RepositoryId;
            expect(repo.name).toBe(url.includes("commons-bcel") ? "commons-bcel" : "commons-beanutils");
            expect(repo.ownerId).toBe("apache");
            expect(repo.name).not.toContain(".git");
          }
        });
      });

      test("should preserve repository names without .git", () => {
        const result = SourceIdentifierCompanion.fromUrlOrShorthand("https://github.com/apache/commons-bcel");

        expect(typeof result).toBe("object");
        if (typeof result === "object" && result !== null && "name" in result) {
          const repo = result as dto.RepositoryId;
          expect(repo.name).toBe("commons-bcel");
        }
      });

      test("should handle owner URLs correctly (no .git to strip)", () => {
        const result = SourceIdentifierCompanion.fromUrlOrShorthand("https://github.com/apache");

        expect(typeof result).toBe("string");
        expect(result).toBe("apache");
      });

      test("should handle regular URLs (strings)", () => {
        const result = SourceIdentifierCompanion.fromUrlOrShorthand("https://example.com/project");

        expect(typeof result).toBe("string");
        expect(result).toBe("https://example.com/project");
      });
    });

    describe("end-to-end verification for backend submission", () => {
      test("should ensure RepositoryId created from .git URLs does not have .git in name", () => {
        // Simulate the exact flow from handleBulkSave in UpsertProjectItemModal
        const bulkUrls = [
          "https://github.com/apache/commons-bcel.git",
          "https://github.com/apache/commons-beanutils.git",
        ];

        const sourceIdentifiers = bulkUrls.map((url) => SourceIdentifierCompanion.fromUrlOrShorthand(url));

        sourceIdentifiers.forEach((sourceIdentifier, index) => {
          expect(typeof sourceIdentifier).toBe("object");

          if (typeof sourceIdentifier === "object" && sourceIdentifier !== null && "name" in sourceIdentifier) {
            const repo = sourceIdentifier as dto.RepositoryId;
            // This is what gets sent to the backend - must NOT have .git
            const repoName = repo.name;
            expect(repoName).not.toContain(".git");
            expect(repoName.endsWith(".git")).toBe(false);

            // Verify specific values
            if (index === 0) {
              expect(repoName).toBe("commons-bcel");
            } else {
              expect(repoName).toBe("commons-beanutils");
            }

            // Verify the full identifier format
            const fullIdentifier = `${repo.ownerId}/${repoName}`;
            expect(fullIdentifier).not.toContain(".git");
          }
        });
      });
    });
  });

  describe("equals", () => {
    describe("case-insensitive comparison (normalizeCase: true, default)", () => {
      test("should compare RepositoryId case-insensitively", () => {
        const repo1 = { ownerId: { login: "Apache" } as dto.OwnerId, name: "Pekko" } as dto.RepositoryId;
        const repo2 = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;

        expect(SourceIdentifierCompanion.equals(repo1, repo2)).toBe(true);
        expect(SourceIdentifierCompanion.equals(repo1, repo2, true)).toBe(true);
      });

      test("should compare OwnerId case-insensitively", () => {
        const owner1 = { login: "Apache" } as dto.OwnerId;
        const owner2 = { login: "apache" } as dto.OwnerId;

        expect(SourceIdentifierCompanion.equals(owner1, owner2)).toBe(true);
        expect(SourceIdentifierCompanion.equals(owner1, owner2, true)).toBe(true);
      });

      test("should compare strings case-insensitively", () => {
        expect(SourceIdentifierCompanion.equals("Apache", "apache")).toBe(true);
        expect(SourceIdentifierCompanion.equals("Apache", "apache", true)).toBe(true);
      });

      test("should return false for different repositories even with case normalization", () => {
        const repo1 = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;
        const repo2 = { ownerId: { login: "apache" } as dto.OwnerId, name: "commons-bcel" } as dto.RepositoryId;

        expect(SourceIdentifierCompanion.equals(repo1, repo2)).toBe(false);
      });

      test("should return false for different owners even with case normalization", () => {
        const owner1 = { login: "apache" } as dto.OwnerId;
        const owner2 = { login: "facebook" } as dto.OwnerId;

        expect(SourceIdentifierCompanion.equals(owner1, owner2)).toBe(false);
      });
    });

    describe("case-sensitive comparison (normalizeCase: false)", () => {
      test("should compare RepositoryId case-sensitively", () => {
        const repo1 = { ownerId: { login: "Apache" } as dto.OwnerId, name: "Pekko" } as dto.RepositoryId;
        const repo2 = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;

        expect(SourceIdentifierCompanion.equals(repo1, repo2, false)).toBe(false);
      });

      test("should compare OwnerId case-sensitively", () => {
        const owner1 = { login: "Apache" } as dto.OwnerId;
        const owner2 = { login: "apache" } as dto.OwnerId;

        expect(SourceIdentifierCompanion.equals(owner1, owner2, false)).toBe(false);
      });

      test("should compare strings case-sensitively", () => {
        expect(SourceIdentifierCompanion.equals("Apache", "apache", false)).toBe(false);
        expect(SourceIdentifierCompanion.equals("Apache", "Apache", false)).toBe(true);
      });

      test("should return true for identical repositories with same case", () => {
        const repo1 = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;
        const repo2 = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;

        expect(SourceIdentifierCompanion.equals(repo1, repo2, false)).toBe(true);
      });
    });

    describe("type mismatches", () => {
      test("should return false when comparing string to RepositoryId", () => {
        const repo = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;

        expect(SourceIdentifierCompanion.equals("apache/pekko", repo)).toBe(false);
      });

      test("should return false when comparing RepositoryId to OwnerId", () => {
        const repo = { ownerId: { login: "apache" } as dto.OwnerId, name: "pekko" } as dto.RepositoryId;
        const owner = { login: "apache" } as dto.OwnerId;

        expect(SourceIdentifierCompanion.equals(repo, owner)).toBe(false);
      });
    });
  });
});
