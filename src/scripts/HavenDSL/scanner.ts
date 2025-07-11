import type { Op, Token, TT } from './types'

export class Scanner {
  raw: string
  tokens: Token[]
  errors: string[]
  lexeme: string
  parsingInvalidSequence: boolean
  invalidSequence: string

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
          this.errors.push(`Invalid token: \`${this.invalidSequence}\``)
          this.parsingInvalidSequence = false
          this.invalidSequence = ''
        }
        continue
      }

      // Operators
      if (char == ':' || char == '=') {
        this.consume()
        this.addToken('op', char)
        continue
      }
      if (char == '<' || char == '>') {
        this.consume()
        if (!this.atEnd() && this.peek() == '=') {
          this.consume()
        }
        this.addToken('op', this.lexeme as Op)
        continue
      }

      // Single Char Tokens
      if (char == '-') {
        this.consume()
        this.addToken('not', '-')
        continue
      }
      if (char == '(') {
        this.consume()
        this.addToken('lpren', '(')
        continue
      }
      if (char == ')') {
        this.consume()
        this.addToken('rpren', ')')
        continue
      }

      // Words
      if (this.isAlpha(char)) {
        this.consume()
        while (!this.atEnd() && this.isAlphaNumberic(this.peek())) {
          this.consume()
        }
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

      // Ints (potentailly words?)
      if (this.isNumberic(char)) {
        this.consume()
        while (!this.atEnd() && this.isNumberic(this.peek())) {
          this.consume()
        }
        if (!this.atEnd() && this.isAlpha(this.peek())) {
          while (!this.atEnd() && this.isAlphaNumberic(this.peek())) {
            this.consume()
          }
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
        let regex = ""
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
                this.addToken('regex', new RegExp(regex,"i"))
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

      // if none of the above, error out
      if (!this.parsingInvalidSequence) {
        this.parsingInvalidSequence = true
        this.invalidSequence = ''
      }
      this.invalidSequence += char
      this.skipConsume()
    }

    this.addToken("EOF","")
  }

  atEnd(): boolean {
    return this.raw.length == 0
  }

  peek(): string {
    return this.raw[0]
  }

  consume() {
    this.lexeme += this.raw[0]
    this.raw = this.raw.slice(1)
  }
  skipConsume() {
    this.raw = this.raw.slice(1)
  }

  isAlpha(char: string): boolean {
    return /^[a-zA-Z]$/.test(char)
  }
  isAlphaNumberic(char: string): boolean {
    return /^[a-zA-Z0-9]$/.test(char)
  }
  isNumberic(char: string): boolean {
    return /^[0-9]$/.test(char)
  }

  addToken<T extends TT>(
    tokenType: T,
    value: T extends 'int' ? number : T extends 'op' ? Op : T extends 'regex'? RegExp : T extends 'null'? null : string,
  ) {
    if (this.parsingInvalidSequence) {
      this.errors.push(`Invalid token: \`${this.invalidSequence}\``)
      this.parsingInvalidSequence = false
      this.invalidSequence = ''
    }
    if (tokenType === 'int') {
      this.tokens.push({ type: 'int', lexeme:this.lexeme, value: value as number })
    } else if (tokenType === 'op') {
      this.tokens.push({ type: 'op', lexeme:this.lexeme, value: value as Op })
    } else if (tokenType === 'regex') {
        this.tokens.push({ type: 'regex', lexeme:this.lexeme, value: value as RegExp })
    } else if (tokenType === 'null') {
        this.tokens.push({ type: 'null', lexeme:this.lexeme, value: value as null })
    } else {
      this.tokens.push({ type: tokenType, lexeme:this.lexeme, value: value as string })
    }
    this.lexeme = ''
  }
}
