import { ProjectItemType, RepositoryId, SourceIdentifier } from "@open-source-economy/api-types";
import { BulkProjectUrlParser, ParsedProjectUrl } from "../BulkProjectUrlParser";
import { SourceIdentifierCompanion } from "../companions/SourceIdentifier.companion";

describe("BulkProjectUrlParser", () => {
  // Helper functions
  const getDisplayName = (si: SourceIdentifier): string => SourceIdentifierCompanion.displayName(si);

  const verifyNoGitSuffix = (sourceIdentifier: SourceIdentifier, expectedName: string) => {
    expect(sourceIdentifier).toBeInstanceOf(RepositoryId);
    if (sourceIdentifier instanceof RepositoryId) {
      expect(sourceIdentifier.name).toBe(expectedName);
      expect(sourceIdentifier.name).not.toContain(".git");
      expect(sourceIdentifier.name.endsWith(".git")).toBe(false);
    }
  };

  const expectValidProject = (result: ParsedProjectUrl, expectedType: ProjectItemType, expectedDisplayName?: string) => {
    expect(result.error).toBeUndefined();
    expect(result.projectType).toBe(expectedType);
    if (expectedDisplayName) {
      expect(getDisplayName(result.sourceIdentifier)).toBe(expectedDisplayName);
    }
  };

  const expectInvalidProject = (result: ParsedProjectUrl) => {
    expect(result.error).toBeDefined();
  };

  const expectParseResult = (
    result: { validProjects: ParsedProjectUrl[]; invalidProjects?: ParsedProjectUrl[] },
    expectedValid: number,
    expectedInvalid: number = 0,
  ) => {
    expect(result.validProjects.length).toBe(expectedValid);
    expect(result.invalidProjects?.length || 0).toBe(expectedInvalid);
  };
  describe("parseSingleUrl", () => {
    test("should parse valid GitHub repository URL", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("https://github.com/facebook/react", ProjectItemType.GITHUB_REPOSITORY);

      expectValidProject(result, ProjectItemType.GITHUB_REPOSITORY, "facebook/react");
      expect(result.sourceIdentifier).toBeDefined();
    });

    test("should parse GitHub repository URL with .git extension and verify .git is stripped", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("https://github.com/apache/commons-jxpath.git", ProjectItemType.GITHUB_REPOSITORY);

      expectValidProject(result, ProjectItemType.GITHUB_REPOSITORY);
      verifyNoGitSuffix(result.sourceIdentifier, "commons-jxpath");
    });

    test("should parse valid GitHub owner URL", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("https://github.com/nodejs", ProjectItemType.GITHUB_OWNER);

      expectValidProject(result, ProjectItemType.GITHUB_OWNER, "nodejs");
    });

    test("should parse valid non-GitHub URL", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("https://example.com/project", ProjectItemType.URL);

      expectValidProject(result, ProjectItemType.URL, "https://example.com/project");
    });

    test("should reject URL that doesn't match expected type", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("https://github.com/facebook/react", ProjectItemType.GITHUB_OWNER);

      expectInvalidProject(result);
    });

    test("should handle empty URL", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("", ProjectItemType.GITHUB_REPOSITORY);
      expect(result.error).toBe("URL cannot be empty");
    });

    test("should handle invalid URL", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("not-a-valid-url", ProjectItemType.GITHUB_REPOSITORY);

      expectInvalidProject(result);
    });

    test("should trim whitespace", () => {
      const result = BulkProjectUrlParser.parseSingleUrl("  https://github.com/facebook/react  ", ProjectItemType.GITHUB_REPOSITORY);

      expectValidProject(result, ProjectItemType.GITHUB_REPOSITORY, "facebook/react");
    });
  });

  describe("parseBulkUrls", () => {
    test("should parse multiple valid URLs", () => {
      const bulkText = `https://github.com/facebook/react
https://github.com/vuejs/vue
https://github.com/angular/angular`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 3, 0);
    });

    test("should parse Apache Commons URLs with .git extensions", () => {
      const bulkText = `https://github.com/apache/commons-jxpath.git
https://github.com/apache/commons-lang.git
https://github.com/apache/xalan-java`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 3, 0);
      expect(result.validProjects.every(p => p.projectType === ProjectItemType.GITHUB_REPOSITORY)).toBe(true);
      expect(result.validProjects.map(p => getDisplayName(p.sourceIdentifier))).toEqual(["apache/commons-jxpath", "apache/commons-lang", "apache/xalan-java"]);
    });

    test("should strip .git suffix when creating RepositoryId from URLs with .git", () => {
      const bulkText = `https://github.com/apache/commons-bcel.git
https://github.com/apache/commons-beanutils.git`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 2, 0);

      // Verify that .git is stripped in sourceIdentifier
      const bcelProject = result.validProjects.find(p => p.sourceIdentifier instanceof RepositoryId && p.sourceIdentifier.name === "commons-bcel");
      const beanutilsProject = result.validProjects.find(p => p.sourceIdentifier instanceof RepositoryId && p.sourceIdentifier.name === "commons-beanutils");

      expect(bcelProject).toBeDefined();
      expect(beanutilsProject).toBeDefined();

      if (bcelProject?.sourceIdentifier instanceof RepositoryId) {
        verifyNoGitSuffix(bcelProject.sourceIdentifier, "commons-bcel");
        expect(bcelProject.sourceIdentifier.ownerId.login).toBe("apache");
      }

      if (beanutilsProject?.sourceIdentifier instanceof RepositoryId) {
        verifyNoGitSuffix(beanutilsProject.sourceIdentifier, "commons-beanutils");
        expect(beanutilsProject.sourceIdentifier.ownerId.login).toBe("apache");
      }
    });

    test("should ensure .git is stripped in end-to-end flow for bulk save", () => {
      const bulkText = `https://github.com/apache/commons-bcel.git
https://github.com/apache/commons-beanutils.git`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      result.validProjects.forEach(project => {
        if (project.sourceIdentifier instanceof RepositoryId) {
          verifyNoGitSuffix(project.sourceIdentifier, project.sourceIdentifier.name);
        }
      });
    });

    test("should handle mix of valid and invalid URLs", () => {
      const bulkText = `https://github.com/facebook/react
invalid-url
https://github.com/vuejs/vue
not-a-url
https://github.com/angular/angular`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 3, 2);
      const invalidDisplayNames = result.invalidProjects?.map(p => getDisplayName(p.sourceIdentifier)) || [];
      expect(invalidDisplayNames).toContain("invalid-url");
      expect(invalidDisplayNames).toContain("not-a-url");
    });

    test("should filter out empty lines", () => {
      const bulkText = `https://github.com/facebook/react

https://github.com/vuejs/vue
   
https://github.com/angular/angular`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 3, 0);
    });

    test("should handle empty input", () => {
      const result = BulkProjectUrlParser.parseBulkUrls("", ProjectItemType.GITHUB_REPOSITORY);
      expectParseResult(result, 0, 0);
    });

    test("should handle only whitespace", () => {
      const result = BulkProjectUrlParser.parseBulkUrls("   \n  \n  ", ProjectItemType.GITHUB_REPOSITORY);
      expectParseResult(result, 0, 0);
    });

    test("should validate against expected project type", () => {
      const bulkText = `https://github.com/facebook/react
https://github.com/vuejs/vue
https://github.com/nodejs`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 2, 1);
      const invalidDisplayNames = result.invalidProjects?.map(p => getDisplayName(p.sourceIdentifier)) || [];
      expect(invalidDisplayNames).toContain("nodejs");
    });

    test("should handle mixed GitHub and non-GitHub URLs", () => {
      const bulkText = `https://github.com/facebook/react
https://example.com/project
https://github.com/nodejs`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.URL);

      expectParseResult(result, 3, 0);
      expect(result.validProjects.every(p => p.projectType === ProjectItemType.URL)).toBe(true);
    });

    test.each([
      ["comma-separated", "https://github.com/facebook/react,https://github.com/vuejs/vue,https://github.com/angular/angular", 3],
      ["space-separated (multiple)", "https://github.com/facebook/react  https://github.com/vuejs/vue  https://github.com/angular/angular", 3],
      ["semicolon-separated", "https://github.com/facebook/react;https://github.com/vuejs/vue;https://github.com/angular/angular", 3],
      ["mixed separators", "https://github.com/facebook/react, https://github.com/vuejs/vue; https://github.com/angular/angular", 3],
      ["newlines and commas", "https://github.com/facebook/react,https://github.com/vuejs/vue\nhttps://github.com/angular/angular", 3],
      ["single space", "https://github.com/facebook/react https://github.com/vuejs/vue", 2],
      ["multiple spaces", "https://github.com/facebook/react    https://github.com/vuejs/vue", 2],
      ["tabs", "https://github.com/facebook/react\t\thttps://github.com/vuejs/vue", 2],
      ["variable spacing (one then multiple)", "https://github.com/facebook/react https://github.com/vuejs/vue    https://github.com/angular/angular", 3],
      ["variable spacing (multiple then one)", "https://github.com/facebook/react    https://github.com/vuejs/vue https://github.com/angular/angular", 3],
      ["tabs and spaces mixed", "https://github.com/facebook/react\thttps://github.com/vuejs/vue  https://github.com/angular/angular", 3],
    ])("should parse %s URLs", (description, bulkText, expectedCount) => {
      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, expectedCount, 0);
    });

    test("should handle complex mixed separators with different project types", () => {
      const bulkText = `https://github.com/facebook/react, https://github.com/vuejs/vue; https://github.com/angular/angular
https://github.com/nodejs    https://example.com/project`;

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.URL);
      expectParseResult(result, 5, 0);
    });

    test("should handle mixed single and multiple spaces with type filtering", () => {
      const bulkText = "https://github.com/facebook/react https://github.com/vuejs/vue  https://github.com/angular/angular   https://github.com/nodejs";

      const result = BulkProjectUrlParser.parseBulkUrls(bulkText, ProjectItemType.GITHUB_REPOSITORY);

      expectParseResult(result, 3, 1); // nodejs is an owner, not a repo
    });
  });

  describe("extractUrlsFromText", () => {
    test.each([
      ["comma-separated", "url1,url2,url3", ["url1", "url2", "url3"]],
      ["space-separated (multiple spaces)", "url1  url2  url3", ["url1", "url2", "url3"]],
      ["space-separated (single spaces)", "url1 url2 url3", ["url1", "url2", "url3"]],
      ["variable spacing", "url1 url2  url3   url4", ["url1", "url2", "url3", "url4"]],
      ["newline-separated", "url1\nurl2\nurl3", ["url1", "url2", "url3"]],
      ["semicolon-separated", "url1;url2;url3", ["url1", "url2", "url3"]],
      ["mixed separators", "url1, url2; url3\nurl4", ["url1", "url2", "url3", "url4"]],
      ["with whitespace trimming", "  url1  ,  url2  ,  url3  ", ["url1", "url2", "url3"]],
      ["filtering empty strings", "url1,,url2, ,url3", ["url1", "url2", "url3"]],
    ])("should extract URLs from %s text", (description, input, expected) => {
      const urls = BulkProjectUrlParser.extractUrlsFromText(input);
      expect(urls).toEqual(expected);
    });

    test("should handle empty input", () => {
      const urls = BulkProjectUrlParser.extractUrlsFromText("");
      expect(urls).toEqual([]);
    });

    test("should handle only whitespace", () => {
      const urls = BulkProjectUrlParser.extractUrlsFromText("   \n  \t  ");
      expect(urls).toEqual([]);
    });
  });

  describe("formatValidationError", () => {
    const createInvalidProject = (displayName: string, error: string, detectedType?: ProjectItemType): ParsedProjectUrl => ({
      sourceIdentifier: displayName,
      projectType: ProjectItemType.GITHUB_REPOSITORY,
      error,
      detectedType,
    });

    test("should format single invalid URL", () => {
      const invalidProjects = [createInvalidProject("invalid-url", "This URL is not a valid GitHub Repository. Please check the URL format.")];
      const error = BulkProjectUrlParser.formatValidationError(invalidProjects);

      expect(error).toContain("invalid-url");
    });

    test("should format multiple invalid URLs", () => {
      const invalidProjects = [
        createInvalidProject("invalid-url-1", "Error 1"),
        createInvalidProject("invalid-url-2", "Error 2"),
        createInvalidProject("invalid-url-3", "Error 3"),
      ];
      const error = BulkProjectUrlParser.formatValidationError(invalidProjects);

      ["invalid-url-1", "invalid-url-2", "invalid-url-3"].forEach(url => {
        expect(error).toContain(url);
      });
    });

    test("should truncate when exceeding maxDisplay", () => {
      const invalidProjects = Array.from({ length: 5 }, (_, i) => createInvalidProject(`invalid-url-${i + 1}`, `Error ${i + 1}`));
      const error = BulkProjectUrlParser.formatValidationError(invalidProjects, 3);

      expect(error).toContain("invalid-url-1");
      expect(error).toContain("invalid-url-2");
      expect(error).toContain("invalid-url-3");
      expect(error).toContain("more");
    });

    test("should return empty string for empty array", () => {
      const error = BulkProjectUrlParser.formatValidationError([]);
      expect(error).toBe("");
    });
  });

  describe("edge cases", () => {
    test.each([
      ["query parameters", "https://github.com/facebook/react?tab=readme", ProjectItemType.GITHUB_REPOSITORY],
      ["fragments", "https://github.com/facebook/react#readme", ProjectItemType.GITHUB_REPOSITORY],
      ["trailing slashes", "https://github.com/nodejs/", ProjectItemType.GITHUB_OWNER],
      ["special characters", "https://github.com/user-name/repo_name", ProjectItemType.GITHUB_REPOSITORY],
    ])("should handle URLs with %s", (description, url, projectType) => {
      const result = BulkProjectUrlParser.parseSingleUrl(url, projectType);
      expectValidProject(result, projectType);
    });

    test("should handle very long URLs", () => {
      const longUrl = `https://github.com/${"a".repeat(100)}/${"b".repeat(100)}`;
      const result = BulkProjectUrlParser.parseSingleUrl(longUrl, ProjectItemType.GITHUB_REPOSITORY);
      expectValidProject(result, ProjectItemType.GITHUB_REPOSITORY);
    });
  });
});
