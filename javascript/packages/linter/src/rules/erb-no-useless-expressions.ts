import { BaseRuleVisitor } from "./rule-utils.js"

import { ParserRule } from "../types.js"
import type { UnboundLintOffense, LintContext, FullRuleConfig } from "../types.js"
import type { ParseResult } from "@herb-tools/core"

class ERBNoUselessExpressionsVisitor extends BaseRuleVisitor {
}

export class ERBNoUselessExpressionsRule extends ParserRule {
  name = "erb-no-useless-expressions"

  get defaultConfig(): FullRuleConfig {
    return {
      enabled: true,
      severity: "warning"
    }
  }

  check(result: ParseResult, context?: Partial<LintContext>): UnboundLintOffense[] {
    const visitor = new ERBNoUselessExpressionsVisitor(this.name, context)

    visitor.visit(result.value)

    return visitor.offenses
  }
}
