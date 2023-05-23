# Sprint 1 app

Description && technologies:

This is a messenger app.

I use Handlebars templator, node, express, git, docker, render.com

I named css classes using BEM.

# My netlify website: https://zingy-vacherin-b83255.netlify.app/

My render.com site: https://practicum-messenger.onrender.com/

Command to run locally: npm run start

Command for netlify: npm run build

Command for stylelint check: npm run stylelint

Solution fle structure:

src/api - api to work with server data

src/components/ - all components that are used in the pages:

    /chatComponents - for chat page and 3 sub folders for main parts of the page (chat content, chat list and chat options)
    /profileComponents - for the profile page
    /commonComponents - common for all parts of the app, inputs, links etc.


src/pages/ - for all main pages like login, sign up, profile, profile edit, error page etc.

static/ - for fonts and images

src/controller - controller that contains the logic of the app, 3 main for 3 main parts users, chat and authentication

src/models - models of the data

src/modules - store that stores the app state

src/routing - for routing

src/utils - util function to format the time, validate, fetch etc.

what is needed to be installed:

sprint 1 ??

parcel
handlebars 

sprint 2

typescript
eslint

sprint 3

express-rate-limit
sanitize-html

sprint 4

for testing purposes the following dependencies are added

mocha
chai
sinon
jsdom
webpack with the following packages:
    ts-loader
    sass-loader
    style-loader
    css-loader
    HtmlWebpackPlugin
    wepback-dev-server

 husky and npm-run-all for precommit

Docker container commands:

    build: docker build -t messenger .

    run: docker run -p 4000:3000 -d messenger

    stop: docker stop {container_id}

Git:

    push to remote branch: git push origin {branch_name}

    switch to branch: git checkout {branch_name}

    delete remote branch: git push origin -d {branch_name}
    
    delete local branch: git branch -D {branch_name}

    rename local branch: git branch -m {old_name} {new_name}

---


Даже законченный проект остаётся только заготовкой, пока им не начнут пользоваться. Но сначала пользователь должен понять, зачем ему пользоваться вашим кодом. В этом помогает файл README.

README — первое, что прочитает пользователь, когда попадёт в репозиторий на «Гитхабе». Хороший REAMDE отвечает на четыре вопроса:

- Готов ли проект к использованию?
- В чём его польза?
- Как установить?
- Как применять?

## Бейджи

Быстро понять статус проекта помогают бейджи на «Гитхабе». Иногда разработчики ограничиваются парой бейджев, которые сообщат о статусе тестов кода:

![Бэйджи](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/b.png)

Если пользователь увидит ошибку в работе тестов, то поймёт: использовать текущую версию в важном проекте — не лучшая идея.

Бейджи помогают похвастаться достижениями: насколько популярен проект, как много разработчиков создавало этот код. Через бейджи можно даже пригласить пользователя в чат:

![Версии](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/vers.png)

В README **Webpack** строка бейджев подробно рассказывает о покрытии кода тестами. Когда проект протестирован, это вызывает доверие пользователя. Последний бейдж приглашает присоединиться к разработке. 

Другая строка убедит пользователя в стабильности инфраструктуры и популярности проекта. Последний бейдж зовёт в чат проекта.

## Описание

Краткое опишите, какую задачу решает проект. Пользователь не верит обещаниям и не готов читать «полотна» текста. Поэтому в описании достаточно нескольких строк:

![Описание](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/desc.png)

Авторы **React** дробят описание на абзацы и списки — так проще пробежаться глазами по тексту и найти ключевую информацию.

Если у проекта есть сайт, добавьте ссылку в заголовок.

## Установка

Лучше всего пользователя убеждает собственный опыт. Чем быстрее он начнёт пользоваться проектом, тем раньше почувствует пользу. Для этого помогите ему установить приложение: напишите краткую пошаговую инструкцию.

Если проект предназначен для разработчиков, добавьте информацию об установке тестовых версий. Например:

- `npm install` — установка стабильной версии,
- `npm start` — запуск версии для разработчика,
- `npm run build:prod` — сборка стабильной версии.

## **Примеры использования**

Хорошо, если сразу после установки пользователь сможет решить свои задачи без изучения проекта. Это особенно верно, если ваш пользователь — не профессиональный разработчик. Но даже профессионал поймёт вас лучше, если показать примеры использования:

![Ссылки](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/link.png)

Для более подробных инструкции добавьте новые разделы или ссылки:

- на документацию,
- вики проекта,
- описание API.

В учебном проекте будут полезен раздел с описанием стиля кода и правилами разработки: как работать с ветками, пул-реквестами и релизами.

### **Команда**

Если вы работаете в команде, укажите основных участников: им будет приятно, а новые разработчики охотнее присоединятся к проекту. «Гитхаб» — не просто инструмент, это социальная сеть разработчиков.

![Команда](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/team.png)

### **Примеры README**

- «[Реакт](https://github.com/facebook/react)»,
- «[Эхо](https://github.com/labstack/echo)»,
- «[Вебпак](https://github.com/webpack/webpack)»,
- «[ТДенгине](https://github.com/taosdata/TDengine)»,
- «[Соул-хантинг](https://github.com/vladpereskokov/soul-hunting/)».
