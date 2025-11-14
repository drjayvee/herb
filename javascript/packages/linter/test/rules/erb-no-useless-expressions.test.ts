import dedent from "dedent"
import { describe, test } from "vitest"
import { ERBNoUselessExpressionsRule } from "../../src/rules/erb-no-useless-expressions.js"
import { createLinterTest } from "../helpers/linter-test-helper.js"

const { expectNoOffenses, expectWarning, assertOffenses } = createLinterTest(ERBNoUselessExpressionsRule)

describe("ERBNoUselessExpressionsRule", () => {
  test("should not report warning for expression tags with side effect", () => {
    expectNoOffenses(dedent`
      <% posts.each do |post| %>
        <% if post.published? %>
          Published!
        <% end %>
      <% end %>
    `)
  })

  test("should report warning for expression tag without side effect", () => {
    expectWarning("ERB expression tag has no side effect. Did you mean to add an execution tag <%= %>?", { line: 1, column: 1 })

    assertOffenses(dedent`
      <% posts.length %>
    `)
  })
})
