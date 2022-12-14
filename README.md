# **Проект Mesto**
Проектная работа от Яндекс Практикума

### Описание проекта
--------------------
Проект представляет собой интерактивную веб-страницу, в которой есть возможность редактировать свой профиль, включающий в себя поля "Имя" и "О себе", а также имеющий кнопку "Сохранить". Проект содержит красивые карточки с фотографиями и названиями различных уголков нашей планеты, которые загружаются с помощью JavaScript. Я прописала функционал для добавления новых карточек пользователями, а также возможность их удаления. На карточки можно ставить лайки и снимать их. Верстка осуществлялась по макету из графического редактора [Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1). В прошлых работах я реализовала возможность вносить изменения в поля формы и обновлять их на странице, прописала функционал всплывающих окон (pop-up), которые должны открываться по нажатию кнопок "Редактировать" и "Добавить", а также закрываться при клике по крестику.  Также была тщательная работа в функциональных ветках, именование их, слияние и удаление ненужных, что пригодится в настоящей работе. Я использовала новые свойства, которые помогают реализовать переполнение блоков с появляющимся многоточием в конце. В предыдуще работе я разработала валидацию всех форм и улучшила пользовательский интерфейс. Теперь при вводе некорректных данных пользователь увидит ошибку, а само поле подсветится красной рамкой. Также пользователь теперь сможет закрывать форму нажатием клавиши Esc. Стили для неактивных кнопок я брала из [макета](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)
Последняя проектная работа была нацелена на рефакторинг. Я переписала часть кода по принципам ООП и подключила Live Server в VSCode чтобы не было ошибок при подключении js-файлов как модулей.
 Проект самостоятельно реализован с самого начала до конца, используемые в макете шрифты и картинки были загружены и подключены в необходимых файлах. Для оптимизации изображений я воспользовалась ресурсом [TinyPNG](https://tinypng.com/). Также я оптимизировала шрифты с помощью сглаживания.

### В проекте были использованы следующие технологии:
-----------------------------------------------------
* Методология БЭМ
* Организация файловой структуры Nested
* Резиновая и адаптивная верстка
* Flexbox верстка
* Технология Grid Layout
* DOM
* Реализация pop-up и возможность его редактирования с помощью JS
* Валидация форм
* ООП
-----------------------------------------------------------------
### Несколько картинок из проекта:

<img src="./images/Switzerland-Obersee.jpg" width="270" height="270" alt="Озеро в Швейцарии"> <img src="./images/Iceland.jpg" width="270" height="270" alt="Пещера в Исландии"> <img src="./images/Italy-Capri.jpg" width="270" height="270" alt="Капри">

### Ссылка на сайт:
[https://lighttross.github.io/mesto/index.html]

### Рекомендации к использованию:
---------------------------------
Для работы и более детального ознакомления с этим проектом рекомендую клонировать его через git в локальный репозиторий.

### Планы по доработке проекта:
-------------------------------
* Применить функцию calc для большего количества элементов, улучшить код
* Проверить кроссбраузерность и прописать необходимые префиксы
* написать бэкэнд
