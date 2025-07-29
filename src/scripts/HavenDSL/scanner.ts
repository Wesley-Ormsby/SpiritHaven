import type { Op, Token, TT } from './types'

const singleCharTokens: Record<string, TT> = {
  '=': 'op',
  ':': 'op',
  '(': 'lparen',
  ')': 'rparen',
  '-': 'not',
}

export class Scanner {
  private raw: string
  private tokens: Token[]
  private errors: string[]
  private lexeme: string
  private parsingInvalidSequence: boolean
  private invalidSequence: string

  constructor(raw: string) {
    this.raw = `${raw}` // Deepcopy
    this.tokens = []
    this.errors = []
    this.lexeme = ''
    this.parsingInvalidSequence = false
    this.invalidSequence = ''
  }

  scan() {
    this.parsingInvalidSequence = false
    this.invalidSequence = ''
    while (!this.atEnd()) {
      const char = this.peek()

      // Ignore Spaces
      if (/\s/.test(char)) {
        this.skipConsume()
        if (this.parsingInvalidSequence) {
          this.pushInvalidTokenError()
        }
        continue
      }

      // Single character tokens
      const tokenType = singleCharTokens[char]
      if (tokenType) {
        this.consume()
        this.addToken(tokenType, char)
        continue
      }

      // Other operators
      if (char == '<' || char == '>') {
        this.consume()
        if (!this.atEnd() && this.peek() == '=') {
          this.consume()
        }
        this.addToken('op', this.lexeme as Op)
        continue
      }

      // Words
      if (this.isAlpha(char)) {
        this.readWhile(this.isAlphanumeric)
        if (this.lexeme == 'or') {
          this.addToken('or', 'or')
        } else if (this.lexeme == 'null') {
          this.addToken('null', null)
        } else {
          this.addToken('string', this.lexeme)
        }
        continue
      }

      // Strings
      if (char == '"') {
        this.consume()
        let missingEnd = true
        let string = ''
        while (!this.atEnd()) {
          if (this.peek() == '\\') {
            if (this.raw.length > 1 && ['"', '\\'].includes(this.raw[1])) {
              this.consume()
            }
            string += this.peek()
            this.consume()
          } else if (this.peek() == '"') {
            this.consume()
            missingEnd = false
            this.addToken('string', string.trim())
            break
          } else {
            string += this.peek()
            this.consume()
          }
        }
        if (missingEnd) {
          this.errors.push('Expected end to string literal `"`')
        }
        continue
      }

      // Ints and words that start with an int
      if (this.isNumeric(char)) {
        this.readWhile(this.isNumeric)
        if (!this.atEnd() && this.isAlpha(this.peek())) {
          this.readWhile(this.isAlphanumeric)
          this.addToken('string', this.lexeme)
        } else {
          this.addToken('int', Number(this.lexeme))
        }
        continue
      }

      // Regex
      if (char == '/') {
        this.consume()
        let missingEnd = true
        let regex = ''
        while (!this.atEnd()) {
          if (this.peek() == '\\') {
            if (this.raw.length > 1 && ['/', '\\'].includes(this.raw[1])) {
              this.consume()
            }
            regex += this.peek()
            this.consume()
          } else if (this.peek() == '/') {
            this.consume()
            missingEnd = false
            // Test if it is valid
            try {
              this.addToken('regex', new RegExp(regex, 'i'))
            } catch (err) {
              if (err instanceof SyntaxError) {
                this.errors.push(`Regex error for \`${this.lexeme}\`: ${err.message}`) // return the message to display
              } else {
                this.errors.push('Unknown regex error')
              }
            }
            break
          } else {
            regex += this.peek()
            this.consume()
          }
        }
        if (missingEnd) {
          this.errors.push('Expected end to regex literal `/`')
        }
        continue
      }

      // Otherwise, this is an invalid sequence
      if (!this.parsingInvalidSequence) {
        this.parsingInvalidSequence = true
        this.invalidSequence = ''
      }
      this.invalidSequence += char
      this.skipConsume()
    }

    this.addToken('EOF', '')
    return { errors: this.errors, tokens: this.tokens }
  }

  private atEnd(): boolean {
    return this.raw.length == 0
  }

  private peek(): string {
    return this.raw[0]
  }

  private consume() {
    this.lexeme += this.raw[0]
    this.raw = this.raw.slice(1)
  }
  private skipConsume() {
    this.raw = this.raw.slice(1)
  }

  private isAlpha(char: string): boolean {
    return /^[a-zA-Z]$/.test(char)
  }
  private isAlphanumeric(char: string): boolean {
    return /^[a-zA-Z0-9]$/.test(char)
  }
  private isNumeric(char: string): boolean {
    return /^[0-9]$/.test(char)
  }

  private readWhile(condition: (char: string) => boolean): string {
    let result = this.peek()
    this.consume()
    while (!this.atEnd() && condition(this.peek())) {
      result += this.peek()
      this.consume()
    }
    return result
  }
  
  private pushInvalidTokenError() {
    this.errors.push(`Invalid token: \`${this.invalidSequence}\``)
    this.parsingInvalidSequence = false
    this.invalidSequence = ''
  }

  private addToken<T extends TT>(
    tokenType: T,
    value: T extends 'int'
      ? number
      : T extends 'op'
        ? Op
        : T extends 'regex'
          ? RegExp
          : T extends 'null'
            ? null
            : string,
  ) {
    if (this.parsingInvalidSequence) {
      this.pushInvalidTokenError()
    }
    if (tokenType === 'int') {
      this.tokens.push({ type: 'int', lexeme: this.lexeme, value: value as number })
    } else if (tokenType === 'op') {
      this.tokens.push({ type: 'op', lexeme: this.lexeme, value: value as Op })
    } else if (tokenType === 'regex') {
      this.tokens.push({ type: 'regex', lexeme: this.lexeme, value: value as RegExp })
    } else if (tokenType === 'null') {
      this.tokens.push({ type: 'null', lexeme: this.lexeme, value: value as null })
    } else {
      this.tokens.push({ type: tokenType, lexeme: this.lexeme, value: value as string })
    }
    this.lexeme = ''
  }
}
