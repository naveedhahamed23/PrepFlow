package com.prepflow.dsa;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class DsaCatalogSeeder {

    @Bean
    CommandLineRunner seedDsaCatalog(DsaCatalogProblemRepository repository) {
        return args -> {

            if (repository.count() > 0) {
                return;
            }

            repository.saveAll(Set.of(

                    create(
                            "LeetCode",
                            "two-sum",
                            "Two Sum",
                            "Arrays",
                            "Easy",
                            Set.of("Amazon", "Google", "Microsoft"),
                            "https://leetcode.com/problems/two-sum/"
                    ),

                    create(
                            "LeetCode",
                            "best-time-to-buy-and-sell-stock",
                            "Best Time to Buy and Sell Stock",
                            "Arrays",
                            "Easy",
                            Set.of("Amazon", "Microsoft"),
                            "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
                    ),

                    create(
                            "LeetCode",
                            "maximum-subarray",
                            "Maximum Subarray",
                            "Arrays",
                            "Medium",
                            Set.of("Amazon", "Google", "Microsoft"),
                            "https://leetcode.com/problems/maximum-subarray/"
                    ),

                    create(
                            "LeetCode",
                            "3sum",
                            "3Sum",
                            "Arrays",
                            "Medium",
                            Set.of("Amazon", "Meta", "Google"),
                            "https://leetcode.com/problems/3sum/"
                    ),

                    create(
                            "LeetCode",
                            "valid-anagram",
                            "Valid Anagram",
                            "Strings",
                            "Easy",
                            Set.of("Amazon", "Google"),
                            "https://leetcode.com/problems/valid-anagram/"
                    ),

                    create(
                            "LeetCode",
                            "valid-palindrome",
                            "Valid Palindrome",
                            "Strings",
                            "Easy",
                            Set.of("Amazon", "Microsoft"),
                            "https://leetcode.com/problems/valid-palindrome/"
                    ),

                    create(
                            "LeetCode",
                            "reverse-linked-list",
                            "Reverse Linked List",
                            "Linked Lists",
                            "Easy",
                            Set.of("Amazon", "Microsoft", "Google"),
                            "https://leetcode.com/problems/reverse-linked-list/"
                    ),

                    create(
                            "LeetCode",
                            "linked-list-cycle",
                            "Linked List Cycle",
                            "Linked Lists",
                            "Easy",
                            Set.of("Amazon", "Google"),
                            "https://leetcode.com/problems/linked-list-cycle/"
                    ),

                    create(
                            "LeetCode",
                            "valid-parentheses",
                            "Valid Parentheses",
                            "Stacks",
                            "Easy",
                            Set.of("Amazon", "Google", "Microsoft"),
                            "https://leetcode.com/problems/valid-parentheses/"
                    ),

                    create(
                            "LeetCode",
                            "binary-tree-inorder-traversal",
                            "Binary Tree Inorder Traversal",
                            "Trees",
                            "Easy",
                            Set.of("Amazon", "Google", "Microsoft"),
                            "https://leetcode.com/problems/binary-tree-inorder-traversal/"
                    )

            ));

            System.out.println("DSA catalog seeded successfully.");
        };
    }

    private DsaCatalogProblem create(
            String platform,
            String slug,
            String title,
            String topic,
            String difficulty,
            Set<String> companies,
            String url) {

        DsaCatalogProblem problem = new DsaCatalogProblem();

        problem.setPlatform(platform);
        problem.setSlug(slug);
        problem.setTitle(title);
        problem.setTopic(topic);
        problem.setDifficulty(difficulty);
        problem.setCompanies(companies);
        problem.setUrl(url);

        return problem;
    }
}