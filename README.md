# Build

```
npm i
npm run build
```

# Настройки

Настройки по умолчанию [default.js](https://github.com/mshumsky/js-vswidget/blob/main/src/js/config/default.js)  
Темы [themes.js](https://github.com/mshumsky/js-vswidget/blob/main/src/js/config/default.js)

## fab
Используется режимом `person` для определения расположения виджета.  

* **tl** - Верхний левый угол
* **tr** - Верхний правый угол
* **bl** - Нижний левый угол
* **br** - Нижний правый угол

## theme
Используется всеми режимами для кастомизации цвета элементов.  
Объявление новых тем реализуется в файле [themes.js](https://github.com/mshumsky/js-vswidget/blob/main/src/js/config/default.js)  

* **videosales** - Стандартная тема

## mobileMode
Определяет режим отображения виджета в мобильной версии сайта.  
Мобильная режим активируется при размере ширины окна `<=375px`.

* **person** - Круглая анимированная кнопка с изображением
* **topbar**
* **rect**
* **rect-rounded**
* **rect-semi-rounded**

## desktopMode
Определяет режим отображения виджета в десктопной версии сайта.

## topbarPrimaryText, topbarSecondaryText, rectPrimaryText, personPrimaryText, personSecondaryText
Определяет текст, отображаемый в конкретном режиме.

* **string**

## imageSrc
Используется режимом `person` для замены изображения по умолчанию.

* Принимает **ссылку** на файл изображения с соотношением сторон **1:1**

## triggerHash
Включает модификацию `window.location.hash` при клике на виджет, а также запускает `CustomEvent("videosalesroutematch")` в `window` со значением `true` 
в свойстве события `detail` если нажатие инициировало добавление параметра `#call` или `false`;

* **true**
* **false**

## triggerEvent
Позволяет избежать проблем с якорными ссылками на страницах сайта, запуская `CustomEvent("videosaleswidgetclick")` в `window` при клике на виджет.
Передаёт `HTMLButtonElement` виджета в свойстве `detail` события.

* **true**
* **false**

### Пример интеграции с настройками
В данном примере будет использовать режим `rect` в мобильной версии сайта, `person` в десктопной версии, не будет модифицироваться `window.location.hash`, вместо этого придётся ловить сообытие "videosaleswidgetclick".

```html
<script src="./widget.js?mobileMode=rect&desktopMode=person&triggerHash=false&imageSrc=https://via.placeholder.com/72"></script>
```
[Demo](https://temp.mshumsky.info)

