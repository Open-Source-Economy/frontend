import { OwnerId, RepositoryId } from "@open-source-economy/api-types";
import { GithubUrls } from "../GithubUrls";

describe("GithubUrls", () => {
  describe("extractRepositoryId", () => {
    describe("URL variations with trailing paths", () => {
      test("should extract repository from URL with trailing path (/pulls)", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/pulls");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with blob path", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/blob/main/README.md");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with tree path", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/tree/main/src");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with issues path", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/issues");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with releases path", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/releases");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with deep nested path", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/tree/main/src/main/scala/org/apache/pekko");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });
    });

    describe("URL variations with query parameters", () => {
      test("should extract repository from URL with query parameter (?tab=readme)", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko?tab=readme");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with multiple query parameters", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko?tab=readme&ref=main");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with path and query parameter", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/pulls?q=is%3Aopen");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });
    });

    describe("URL variations with fragments", () => {
      test("should extract repository from URL with fragment (#section)", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko#readme");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with path and fragment", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/blob/main/README.md#L10");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with query and fragment", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko?tab=readme#section");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });
    });

    describe("URL variations with trailing slashes", () => {
      test("should extract repository from URL with trailing slash", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko/");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should extract repository from URL with .git and trailing slash", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/pekko.git/");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
          expect(result.name).not.toContain(".git");
        }
      });
    });

    describe(".git suffix stripping", () => {
      test("should strip .git suffix from full GitHub repository URL", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/commons-bcel.git");

        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(RepositoryId);
        if (result) {
          expect(result.name).toBe("commons-bcel");
          expect(result.name).not.toContain(".git");
          expect(result.ownerId.login).toBe("apache");
        }
      });

      test("should strip .git suffix from shorthand repository format", () => {
        const result = GithubUrls.extractRepositoryId("apache/commons-bcel.git", true);

        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(RepositoryId);
        if (result) {
          expect(result.name).toBe("commons-bcel");
          expect(result.name).not.toContain(".git");
          expect(result.ownerId.login).toBe("apache");
        }
      });

      test("should handle multiple .git suffixes in bulk URLs", () => {
        const urls = [
          "https://github.com/apache/commons-bcel.git",
          "https://github.com/apache/commons-beanutils.git",
          "https://github.com/apache/commons-collections.git",
        ];

        urls.forEach(url => {
          const result = GithubUrls.extractRepositoryId(url);
          expect(result).not.toBeNull();
          if (result) {
            expect(result.name).not.toContain(".git");
            expect(result.name.endsWith(".git")).toBe(false);
          }
        });
      });

      test("should preserve repository name without .git suffix", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/commons-bcel");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.name).toBe("commons-bcel");
        }
      });

      test("should handle .git.git edge case (double suffix)", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/repo.git.git");

        expect(result).not.toBeNull();
        if (result) {
          // Should only strip the last .git
          expect(result.name).toBe("repo.git");
        }
      });

      test("should handle repository name that ends with .git but is not a suffix", () => {
        // This is an edge case - a repo actually named "something.git"
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/something.git.git");

        expect(result).not.toBeNull();
        if (result) {
          // Should strip the last .git, leaving "something.git" as the name
          expect(result.name).toBe("something.git");
        }
      });

      test("should NOT strip .git when it is followed by a path (e.g., /pulls)", () => {
        // When .git is followed by a path, it's part of the repository name
        // Example: https://github.com/open-source-economy/frontend.git/pulls
        const result = GithubUrls.extractRepositoryId("https://github.com/open-source-economy/frontend.git/pulls");

        expect(result).not.toBeNull();
        if (result) {
          // .git should be preserved because it's part of the repository name
          expect(result.name).toBe("frontend.git");
          expect(result.ownerId.login).toBe("open-source-economy");
        }
      });

      test("should strip .git when followed by query parameter", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/commons-bcel.git?tab=readme");

        expect(result).not.toBeNull();
        if (result) {
          // .git should be stripped when followed by query parameter
          expect(result.name).toBe("commons-bcel");
          expect(result.name).not.toContain(".git");
        }
      });

      test("should strip .git when followed by fragment", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/commons-bcel.git#readme");

        expect(result).not.toBeNull();
        if (result) {
          // .git should be stripped when followed by fragment
          expect(result.name).toBe("commons-bcel");
          expect(result.name).not.toContain(".git");
        }
      });
    });

    describe("standard repository extraction", () => {
      test("should extract repository from full GitHub URL", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/facebook/react");

        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(RepositoryId);
        if (result) {
          expect(result.ownerId.login).toBe("facebook");
          expect(result.name).toBe("react");
        }
      });

      test("should extract repository from shorthand format", () => {
        const result = GithubUrls.extractRepositoryId("facebook/react", true);

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("facebook");
          expect(result.name).toBe("react");
        }
      });

      test("should return null for owner URL", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/facebook");

        expect(result).toBeNull();
      });

      test("should return null for invalid URL", () => {
        const result = GithubUrls.extractRepositoryId("not-a-valid-url");

        expect(result).toBeNull();
      });

      test("should not extract repository from shorthand when allowShorthand is false", () => {
        const result = GithubUrls.extractRepositoryId("facebook/react", false);

        expect(result).toBeNull();
      });
    });

    describe("edge cases", () => {
      test("should handle repository names with hyphens", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/apache/commons-bcel");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.name).toBe("commons-bcel");
        }
      });

      test("should handle repository names with underscores", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/owner/my_repo");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.name).toBe("my_repo");
        }
      });

      test("should handle repository names with dots", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/owner/my.repo");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.name).toBe("my.repo");
        }
      });

      test("should handle repository names with numbers", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/owner/repo123");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.name).toBe("repo123");
        }
      });

      test("should handle whitespace trimming", () => {
        const result = GithubUrls.extractRepositoryId("  https://github.com/apache/pekko  ");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("apache");
          expect(result.name).toBe("pekko");
        }
      });

      test("should return null for empty string", () => {
        const result = GithubUrls.extractRepositoryId("");

        expect(result).toBeNull();
      });
    });
  });

  describe("extractOwnerId", () => {
    describe("standard owner extraction", () => {
      test("should extract owner from full GitHub URL", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache");

        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(OwnerId);
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should extract owner from shorthand format", () => {
        const result = GithubUrls.extractOwnerId("apache", true);

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should return null for repository URL", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache/commons-bcel");

        expect(result).toBeNull();
      });
    });

    describe("URL variations with trailing slashes", () => {
      test("should extract owner from URL with trailing slash", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache/");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should extract owner from URL with multiple trailing slashes", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache///");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });
    });

    describe("URL variations with query parameters", () => {
      test("should extract owner from URL with query parameter (?tab=repositories)", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache?tab=repositories");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should extract owner from URL with multiple query parameters", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache?tab=repositories&type=source");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should extract owner from URL with trailing slash and query parameter", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache/?tab=repositories");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });
    });

    describe("URL variations with fragments", () => {
      test("should extract owner from URL with fragment (#section)", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache#readme");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should extract owner from URL with query and fragment", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/apache?tab=repositories#section");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });
    });

    describe("edge cases", () => {
      test("should handle owner names with hyphens", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/my-org");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("my-org");
        }
      });

      test("should handle owner names with underscores", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/my_org");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("my_org");
        }
      });

      test("should handle owner names with dots", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/my.org");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("my.org");
        }
      });

      test("should handle owner names with numbers", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/org123");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("org123");
        }
      });

      test("should return null for invalid URL format", () => {
        const result = GithubUrls.extractOwnerId("not-a-valid-url");

        expect(result).toBeNull();
      });

      test("should return null for empty string", () => {
        const result = GithubUrls.extractOwnerId("");

        expect(result).toBeNull();
      });

      test("should handle whitespace trimming", () => {
        const result = GithubUrls.extractOwnerId("  https://github.com/apache  ");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });
    });

    describe("shorthand format", () => {
      test("should extract owner from simple shorthand", () => {
        const result = GithubUrls.extractOwnerId("apache", true);

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("apache");
        }
      });

      test("should not extract owner from shorthand when allowShorthand is false", () => {
        const result = GithubUrls.extractOwnerId("apache", false);

        expect(result).toBeNull();
      });

      test("should not extract owner from shorthand with slash (that's a repo)", () => {
        const result = GithubUrls.extractOwnerId("apache/repo", true);

        expect(result).toBeNull();
      });
    });
  });

  describe("end-to-end .git stripping verification", () => {
    test("should ensure .git is stripped when creating RepositoryId for backend", () => {
      const testUrls = ["https://github.com/apache/commons-bcel.git", "https://github.com/apache/commons-beanutils.git", "apache/commons-collections.git"];

      testUrls.forEach(url => {
        const result = GithubUrls.extractRepositoryId(url, true);
        expect(result).not.toBeNull();
        if (result) {
          // Verify the name sent to backend does NOT contain .git
          expect(result.name).not.toContain(".git");
          expect(result.name.endsWith(".git")).toBe(false);

          // Verify the owner/repo format is correct
          const displayFormat = `${result.ownerId.login}/${result.name}`;
          expect(displayFormat).not.toContain(".git");
        }
      });
    });
  });

  describe("case preservation", () => {
    describe("extractRepositoryId", () => {
      test("should preserve original case in owner and repository names", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/Apache/Pekko");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("Apache");
          expect(result.name).toBe("Pekko");
        }
      });

      test("should preserve case in shorthand", () => {
        const result = GithubUrls.extractRepositoryId("Apache/Pekko", true);

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("Apache");
          expect(result.name).toBe("Pekko");
        }
      });

      test("should preserve mixed case", () => {
        const result = GithubUrls.extractRepositoryId("https://github.com/FaceBook/ReAct");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.ownerId.login).toBe("FaceBook");
          expect(result.name).toBe("ReAct");
        }
      });
    });

    describe("extractOwnerId", () => {
      test("should preserve original case in owner name", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/Apache");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("Apache");
        }
      });

      test("should preserve case in shorthand", () => {
        const result = GithubUrls.extractOwnerId("Apache", true);

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("Apache");
        }
      });

      test("should preserve mixed case", () => {
        const result = GithubUrls.extractOwnerId("https://github.com/FaceBook");

        expect(result).not.toBeNull();
        if (result) {
          expect(result.login).toBe("FaceBook");
        }
      });
    });
  });
});
