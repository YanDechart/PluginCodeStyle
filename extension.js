const vscode = require('vscode');

/**
Функция активации плагина
@param {vscode.ExtensionContext} context - Контекст расширения
*/
function activate(context) {

  const disposable = vscode.commands.registerCommand(
    'extension.convertCodeStyle',
    async function () {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        vscode.window.showInformationMessage('Нет активного редактора!')
        return
      }

      const selection = editor.selection
      const text = editor.document.getText(selection)

      if (!text) {
        vscode.window.showInformationMessage('Выделите текст для преобразования!')
        return
      }

      const choice = await vscode.window.showQuickPick(
        ['camelCase', 'PascalCase', 'snake_case'],
        { placeHolder: 'Выберите формат' }
      )

      if (!choice) return

      const converted = convert(text, choice)

      // Собираем все совпадения и их диапазоны
      const documentText = editor.document.getText()
      const regex = new RegExp(`\\b${escapeRegExp(text)}\\b`, 'g')
      const edits = []
      let match
      while ((match = regex.exec(documentText)) !== null) {
        const startPos = editor.document.positionAt(match.index)
        const endPos = editor.document.positionAt(match.index + match[0].length)
        edits.push({ range: new vscode.Range(startPos, endPos), text: converted })
      }

      // Применяем все изменения с конца документа к началу
      editor.edit(editBuilder => {
        edits.reverse().forEach(edit => {
          editBuilder.replace(edit.range, edit.text)
        })
      })

      vscode.window.showInformationMessage(`Преобразовано в ${choice}`)
    }
  )

  context.subscriptions.push(disposable)
}

/**
Разбивает текст на слова для обработки
@param {string} text - Исходный текст
@returns {string[]} массив слов
*/
function splitWords(text) {
  return text
    // Разделяем по пробелам, дефисам, подчеркиваниям
    .split(/[\s_\-]+/)
    // Берем последовательности:
    // 1) заглавные буквы, перед которыми идут другие заглавные и строчные или цифры
    // 2) заглавная + строчные + цифры
    // 3) только строчные + цифры
    // 4) только цифры
    .flatMap(word => word.match(/[A-Z]+(?=[A-Z][a-z0-9]|[0-9]|$)|[A-Z]?[a-z0-9]+|[0-9]+/g) || [])
    .filter(Boolean)
}

/**
Преобразует текст в выбранный стиль идентификаторов
@param {string} text - Исходный текст
@param {'camelCase'|'PascalCase'|'snake_case'} format - Стиль преобразования
@returns {string} преобразованный текст
*/
function convert(text, format) {
  const words = splitWords(text)

  switch (format) {
    case 'camelCase':
      return words[0].toLowerCase() +
        words.slice(1).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
    case 'PascalCase':
      return words.map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
    case 'snake_case':
      return words.map(w => w.toLowerCase()).join('_')
    default:
      return text
  }
}

/**
Экранирует специальные символы RegExp в строке
@param {string} string - Входная строка
@returns {string} строка с экранированными спецсимволами
*/
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
Функция деактивации плагина
*/
function deactivate() {}

module.exports = { activate, deactivate }
