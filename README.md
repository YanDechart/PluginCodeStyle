Шакиров Михаил Зинурович 501900 m3101

# Convert Identifier Case

Плагин для VS Code, который позволяет пользователю изменить
имя переменной, функции или любого идентификатора в тексте
в один из выбранных стилей:
- camelCase
- PascalCase
- snake_case

Особенности:
- Преобразует выделенный текст
- Заменяет все вхождения идентификатора в текущем документе

---
# Functions

<dl>
<dt><a href="#activate">activate(context)</a></dt>
<dd><p>Функция активации плагина</p>
</dd>
<dt><a href="#splitWords">splitWords(text)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Разбивает текст на слова для обработки</p>
</dd>
<dt><a href="#convert">convert(text, format)</a> ⇒ <code>string</code></dt>
<dd><p>Преобразует текст в выбранный стиль идентификаторов</p>
</dd>
<dt><a href="#escapeRegExp">escapeRegExp(string)</a> ⇒ <code>string</code></dt>
<dd><p>Экранирует специальные символы RegExp в строке</p>
</dd>
<dt><a href="#deactivate">deactivate()</a></dt>
<dd><p>Функция деактивации плагина</p>
</dd>
</dl>

<a name="activate"></a>

## activate(context)
Функция активации плагина

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>vscode.ExtensionContext</code> | Контекст расширения |

<a name="splitWords"></a>

## splitWords(text) ⇒ <code>Array.&lt;string&gt;</code>
Разбивает текст на слова для обработки

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - массив слов  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Исходный текст |

<a name="convert"></a>

## convert(text, format) ⇒ <code>string</code>
Преобразует текст в выбранный стиль идентификаторов

**Kind**: global function  
**Returns**: <code>string</code> - преобразованный текст  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Исходный текст |
| format | <code>&#x27;camelCase&#x27;</code> \| <code>&#x27;PascalCase&#x27;</code> \| <code>&#x27;snake\_case&#x27;</code> | Стиль преобразования |

<a name="escapeRegExp"></a>

## escapeRegExp(string) ⇒ <code>string</code>
Экранирует специальные символы RegExp в строке

**Kind**: global function  
**Returns**: <code>string</code> - строка с экранированными спецсимволами  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | Входная строка |

<a name="deactivate"></a>

## deactivate()
Функция деактивации плагина

**Kind**: global function  
