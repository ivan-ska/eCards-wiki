// Поисковый индекс — все статьи базы знаний
// Структура каждой записи:
// { page, pageLabel, pageUrl, sectionId, sectionTitle, id, title, keywords }
//
// page: 'faq' | 'terminology'
// id: id аккордеона (якорь)
// keywords: ключевые слова и фразы для поиска (строчные, через пробел)

const SEARCH_INDEX = [
    // ===== FAQ =====

    // 1. Безопасность
    {
        page: '01-security', pageLabel: 'Безопасность', pageUrl: '01-security.html',
        sectionId: 'faq-security', sectionTitle: '1. Безопасность',
        id: 'q-2fa',
        title: 'Как настроить двухфакторную аутентификацию?',
        keywords: '2fa двухфакторная аутентификация google authenticator qr код безопасность пароль вход потеряли доступ телефон сломался'
    },
    {
        page: '01-security', pageLabel: 'Безопасность', pageUrl: '01-security.html',
        sectionId: 'faq-security', sectionTitle: '1. Безопасность',
        id: 'q-change-login',
        title: 'Как сменить логин или почту?',
        keywords: 'сменить логин почта email изменить логин аккаунт профиль безопасность'
    },

    // 2. Telegram-бот
    {
        page: '02-tg-bot', pageLabel: 'Telegram-бот', pageUrl: '02-tg-bot.html',
        sectionId: 'faq-tg-bot', sectionTitle: '2. Подключение Telegram-бота',
        id: 'q-tg',
        title: 'Как подключить Telegram-бот для уведомлений?',
        keywords: 'telegram бот уведомления подключить телеграм активация 3ds смс оповещения сотрудник кабинет переподключить'
    },

    // 3. Пополнение баланса
    {
        page: '03-deposit', pageLabel: 'Пополнение баланса', pageUrl: '03-deposit.html',
        sectionId: 'faq-deposit', sectionTitle: '3. Пополнение баланса',
        id: 'q-how-deposit',
        title: 'Как пополнить баланс?',
        keywords: 'пополнить баланс инвойс хэш транзакция usdt trc20 erc20 wire sepa зачисление реквизиты перевод'
    },
    {
        page: '03-deposit', pageLabel: 'Пополнение баланса', pageUrl: '03-deposit.html',
        sectionId: 'faq-deposit', sectionTitle: '3. Пополнение баланса',
        id: 'q-min-deposit',
        title: 'Какое минимальное пополнение?',
        keywords: 'минимальное пополнение минимум 500 100 usd первое пополнение'
    },
    {
        page: '03-deposit', pageLabel: 'Пополнение баланса', pageUrl: '03-deposit.html',
        sectionId: 'faq-deposit', sectionTitle: '3. Пополнение баланса',
        id: 'q-deposit-stuck',
        title: 'Пополнение зависло / не зачисляется. Что делать?',
        keywords: 'пополнение зависло не зачисляется задержка проблема поддержка хэш инвойс'
    },
    {
        page: '03-deposit', pageLabel: 'Пополнение баланса', pageUrl: '03-deposit.html',
        sectionId: 'faq-deposit', sectionTitle: '3. Пополнение баланса',
        id: 'q-deposit-weekend',
        title: 'Можно ли пополнить в нерабочее время?',
        keywords: 'нерабочее время выходной ночь пополнение зачисление договориться поддержка'
    },

    // 4. Комиссия
    {
        page: '04-fees', pageLabel: 'Комиссия', pageUrl: '04-fees.html',
        sectionId: 'faq-fees', sectionTitle: '4. Комиссия сервиса',
        id: 'q-fee-deposit',
        title: 'Какая комиссия при пополнении?',
        keywords: 'комиссия пополнение 3% 4.5% usdt wire sepa eur usd базовый счет перевод'
    },
    {
        page: '04-fees', pageLabel: 'Комиссия', pageUrl: '04-fees.html',
        sectionId: 'faq-fees', sectionTitle: '4. Комиссия сервиса',
        id: 'q-fee-transactions',
        title: 'Есть ли комиссия за транзакции?',
        keywords: 'комиссия транзакция платеж успешная отклоненная декалайн штраф decline rate процент'
    },
    {
        page: '04-fees', pageLabel: 'Комиссия', pageUrl: '04-fees.html',
        sectionId: 'faq-fees', sectionTitle: '4. Комиссия сервиса',
        id: 'q-fee-withdraw',
        title: 'Есть ли комиссия за вывод?',
        keywords: 'комиссия вывод средства без комиссии рабочие дни срок'
    },
    {
        page: '04-fees', pageLabel: 'Комиссия', pageUrl: '04-fees.html',
        sectionId: 'faq-fees', sectionTitle: '4. Комиссия сервиса',
        id: 'q-fee-custom',
        title: 'Можно ли договориться об индивидуальных условиях?',
        keywords: 'индивидуальные условия оборот договориться поддержка скидка'
    },

    // 5. Базовые счета
    {
        page: '05-base-acc', pageLabel: 'Базовые счета', pageUrl: '05-base-acc.html',
        sectionId: 'faq-base-acc', sectionTitle: '5. Базовые счета',
        id: 'q-transfer-acc',
        title: 'Как перевести средства между счетами?',
        keywords: 'перевод между счетами конвертация валюта курс usd eur базовый лимитный'
    },

    // 6. Лимитные счета
    {
        page: '06-limit-acc', pageLabel: 'Лимитные счета', pageUrl: '06-limit-acc.html',
        sectionId: 'faq-limit-acc', sectionTitle: '6. Лимитные счета',
        id: 'q-fund-limit-acc',
        title: 'Как пополнить лимитный счёт?',
        keywords: 'пополнить лимитный счет лимит карта базовый перевод'
    },
    {
        page: '06-limit-acc', pageLabel: 'Лимитные счета', pageUrl: '06-limit-acc.html',
        sectionId: 'faq-limit-acc', sectionTitle: '6. Лимитные счета',
        id: 'q-refund-limit-card',
        title: 'Что происходит с возвратом на лимитную карту?',
        keywords: 'возврат лимитная карта refund счет лимит поднять использовать'
    },

    // 7. Единые лимитные счета
    {
        page: '07-unified-acc', pageLabel: 'Единые лимитные счета', pageUrl: '07-unified-acc.html',
        sectionId: 'faq-unified-acc', sectionTitle: '7. Единые лимитные счета',
        id: 'q-unified-teamwork',
        title: 'Как использовать единый лимитный счёт для командной работы?',
        keywords: 'единый лимитный счет команда сотрудники owner делегирование bin разные карты баланс статистика'
    },

    // 8. Счета с общим балансом
    {
        page: '08-shared-acc', pageLabel: 'Счета с общим балансом', pageUrl: '08-shared-acc.html',
        sectionId: 'faq-shared-acc', sectionTitle: '8. Счета с общим балансом',
        id: 'q-shared-acc-cards',
        title: 'Для каких карт доступен счёт с общим балансом?',
        keywords: 'общий баланс счет eur bin доступен разработка usd карты'
    },

    // 9. Выпуск карт
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-how-issue',
        title: 'Как выпустить карты?',
        keywords: 'выпустить карту виртуальные карты bin счет количество 100 стартовый баланс купить'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-available-cards',
        title: 'Какие карты доступны?',
        keywords: 'какие карты доступны usd eur bin сша эстония гонконг 3ds бесплатные лимит 20 100 транзакций'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-services-cards',
        title: 'Для каких сервисов можно использовать карты?',
        keywords: 'google ads tiktok facebook meta домены хостинг apple pay реклама площадки'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-billing-address',
        title: 'Какой billing address указывать для разных BIN?',
        keywords: 'billing address адрес bin провайдер эстония великобритания гонконг сша san mateo concord ca'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-card-declined',
        title: 'Карту не принимает рекламная площадка. Что делать?',
        keywords: 'карту не принимает декалайн declined площадка google ads chatgpt гео аккаунт прокси billing address bin проблема ошибка'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-forbidden',
        title: 'Что запрещено оплачивать?',
        keywords: 'запрещено мошенничество first billing блокировка нарушение'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-closing-no-spend',
        title: 'Что будет при закрытии карт без расходов?',
        keywords: 'закрытие карт без расходов спенд блокировка минимум 10 usd'
    },
    {
        page: '09-issue-cards', pageLabel: 'Выпуск карт', pageUrl: '09-issue-cards.html',
        sectionId: 'faq-issue-cards', sectionTitle: '9. Выпуск карт',
        id: 'q-withdraw-funds',
        title: 'Как вывести средства?',
        keywords: 'вывод средства trc20 кошелек баланс закрыть карты базовый счет поддержка дней'
    },

    // 10. Лимиты карт
    {
        page: '10-card-limits', pageLabel: 'Лимиты карт', pageUrl: '10-card-limits.html',
        sectionId: 'faq-card-limits', sectionTitle: '10. Лимиты карт',
        id: 'q-change-limit',
        title: 'Как изменить лимит карты?',
        keywords: 'изменить лимит карта +50 +100 +200 +500 пополнить сумма'
    },
    {
        page: '10-card-limits', pageLabel: 'Лимиты карт', pageUrl: '10-card-limits.html',
        sectionId: 'faq-card-limits', sectionTitle: '10. Лимиты карт',
        id: 'q-one-time-limit',
        title: 'Можно ли установить лимит на одну транзакцию?',
        keywords: 'лимит одна транзакция платеж bin поддержка'
    },

    // 11. Команды и роли
    {
        page: '11-teams-roles', pageLabel: 'Команды и роли', pageUrl: '11-teams-roles.html',
        sectionId: 'faq-teams-roles', sectionTitle: '11. Команды и роли',
        id: 'q-create-team',
        title: 'Как создать команду?',
        keywords: 'создать команду сотрудники роли добавить счет делегирование important'
    },
    {
        page: '11-teams-roles', pageLabel: 'Команды и роли', pageUrl: '11-teams-roles.html',
        sectionId: 'faq-teams-roles', sectionTitle: '11. Команды и роли',
        id: 'q-invite-employee',
        title: 'Как пригласить сотрудника?',
        keywords: 'пригласить сотрудника email роль команда приглашение принять кабинет'
    },
    {
        page: '11-teams-roles', pageLabel: 'Команды и роли', pageUrl: '11-teams-roles.html',
        sectionId: 'faq-teams-roles', sectionTitle: '11. Команды и роли',
        id: 'q-multiple-teams',
        title: 'Можно ли назначить сотрудника в несколько команд?',
        keywords: 'несколько команд сотрудник несколько ролей назначить'
    },
    {
        page: '11-teams-roles', pageLabel: 'Команды и роли', pageUrl: '11-teams-roles.html',
        sectionId: 'faq-teams-roles', sectionTitle: '11. Команды и роли',
        id: 'q-edit-team',
        title: 'Как изменить состав команды?',
        keywords: 'изменить состав команды члены команды удалить добавить участник'
    },

    // 12. Делегирование
    {
        page: '12-delegation', pageLabel: 'Делегирование', pageUrl: '12-delegation.html',
        sectionId: 'faq-delegation', sectionTitle: '12. Делегирование',
        id: 'q-delegate-new',
        title: 'Как делегировать счёт при его создании?',
        keywords: 'делегировать счет создание новый сотрудник команда доступ'
    },
    {
        page: '12-delegation', pageLabel: 'Делегирование', pageUrl: '12-delegation.html',
        sectionId: 'faq-delegation', sectionTitle: '12. Делегирование',
        id: 'q-delegate-existing',
        title: 'Как делегировать уже открытый счёт?',
        keywords: 'делегировать открытый счет три точки меню действий сотрудник команда'
    },
    {
        page: '12-delegation', pageLabel: 'Делегирование', pageUrl: '12-delegation.html',
        sectionId: 'faq-delegation', sectionTitle: '12. Делегирование',
        id: 'q-transfer-card',
        title: 'Можно ли перенести карту между счетами?',
        keywords: 'перенести карту счет передать фарм баинг лимитный bin ограничения единый'
    },

    // 13. Фильтры карт
    {
        page: '13-card-filters', pageLabel: 'Фильтры карт', pageUrl: '13-card-filters.html',
        sectionId: 'faq-card-filters', sectionTitle: '13. Виртуальные карты — фильтры и отображение',
        id: 'q-add-card-group',
        title: 'Как добавить карту в группу?',
        keywords: 'группа карта добавить редактировать группы карт создать'
    },

    // 14. Отчёты по картам
    {
        page: '14-card-reports', pageLabel: 'Отчёты по картам', pageUrl: '14-card-reports.html',
        sectionId: 'faq-card-reports', sectionTitle: '14. Отчёты по картам',
        id: 'q-how-to-card-report',
        title: 'Как сформировать отчёт по картам?',
        keywords: 'отчет карты сформировать csv xlsx операции фильтры уведомления скачать declined штраф'
    },

    // 15. Отчёты по счетам
    {
        page: '15-account-reports', pageLabel: 'Отчёты по счетам', pageUrl: '15-account-reports.html',
        sectionId: 'faq-account-reports', sectionTitle: '15. Отчёты по счетам',
        id: 'q-account-reports-info',
        title: 'Где посмотреть и скачать отчёт по счетам?',
        keywords: 'отчет счета операции переводы лимиты штрафы скачать сформировать'
    },

    // 16. Статистика по дням
    {
        page: '16-daily-stats', pageLabel: 'Статистика по дням', pageUrl: '16-daily-stats.html',
        sectionId: 'faq-daily-stats', sectionTitle: '16. Статистика по дням',
        id: 'q-daily-stats-info',
        title: 'Где посмотреть статистику трат по дням?',
        keywords: 'статистика траты дни неделя месяц eur usd фильтры команды gmt часовой пояс'
    },

    // 17. Уведомления, 3DS
    {
        page: '17-notifications-3ds', pageLabel: 'Уведомления и 3DS', pageUrl: '17-notifications-3ds.html',
        sectionId: 'faq-notifications-3ds', sectionTitle: '17. Уведомления, 3DS и коды',
        id: 'q-receive-codes',
        title: 'Как получать уведомления и коды авторизации?',
        keywords: 'уведомления коды авторизации telegram 3ds смс подключить'
    },
    {
        page: '17-notifications-3ds', pageLabel: 'Уведомления и 3DS', pageUrl: '17-notifications-3ds.html',
        sectionId: 'faq-notifications-3ds', sectionTitle: '17. Уведомления, 3DS и коды',
        id: 'q-no-sms',
        title: 'Не приходит SMS с кодом. Что делать?',
        keywords: 'не приходит смс код 3ds проблема поддержка id карты'
    },
    {
        page: '17-notifications-3ds', pageLabel: 'Уведомления и 3DS', pageUrl: '17-notifications-3ds.html',
        sectionId: 'faq-notifications-3ds', sectionTitle: '17. Уведомления, 3DS и коды',
        id: 'q-disable-3ds',
        title: 'Можно ли отключить 3DS на картах?',
        keywords: 'отключить 3ds невозможно нельзя'
    },

    // 18. Реферальная программа
    {
        page: '18-referral', pageLabel: 'Реферальная программа', pageUrl: '18-referral.html',
        sectionId: 'faq-referral', sectionTitle: '18. Реферальная программа',
        id: 'q-referral-works',
        title: 'Как работает реферальная программа?',
        keywords: 'реферальная программа реферал ссылка 0.25% 0.1% комиссия 6 месяцев 10000 пополнения reversal refund задержка 14 дней'
    },
    {
        page: '18-referral', pageLabel: 'Реферальная программа', pageUrl: '18-referral.html',
        sectionId: 'faq-referral', sectionTitle: '18. Реферальная программа',
        id: 'q-referral-withdraw',
        title: 'Как вывести реферальные начисления?',
        keywords: 'вывести реферальные начисления условия поддержка индивидуально'
    },

    // 19. Возврат средств
    {
        page: '19-refunds', pageLabel: 'Возвраты', pageUrl: '19-refunds.html',
        sectionId: 'faq-refunds', sectionTitle: '19. Возврат средств (Refund)',
        id: 'q-when-refund',
        title: 'Когда придёт возврат на карту?',
        keywords: 'возврат карта refund срок 10 рабочих дней поддержка'
    },
    {
        page: '19-refunds', pageLabel: 'Возвраты', pageUrl: '19-refunds.html',
        sectionId: 'faq-refunds', sectionTitle: '19. Возврат средств (Refund)',
        id: 'q-funds-lost',
        title: 'Средства списались, но в рекламный кабинет не попали. Деньги потеряны?',
        keywords: 'списались не попали рекламный кабинет потеряны деньги возврат банк'
    },
    {
        page: '19-refunds', pageLabel: 'Возвраты', pageUrl: '19-refunds.html',
        sectionId: 'faq-refunds', sectionTitle: '19. Возврат средств (Refund)',
        id: 'q-refund-limit-use',
        title: 'Возврат пришёл на лимитную карту. Как использовать эти средства?',
        keywords: 'возврат лимитная карта использовать лимит поднять счет'
    },

    // ===== ТЕРМИНОЛОГИЯ =====

    // Общие понятия
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-general', sectionTitle: 'Общие понятия',
        id: 'term-2fa',
        title: '2FA — двухфакторная аутентификация',
        keywords: '2fa двухфакторная аутентификация защита аккаунт пароль код приложение authenticator'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-general', sectionTitle: 'Общие понятия',
        id: 'term-decline-rate',
        title: 'Decline Rate — процент отклонённых операций',
        keywords: 'decline rate процент отклоненные операции штраф расчет 100 операций 50% блокировка'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-general', sectionTitle: 'Общие понятия',
        id: 'term-referral',
        title: 'Реферал',
        keywords: 'реферал пользователь регистрация ссылка 0.25% 6 месяцев комиссия'
    },

    // Счета
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-accounts', sectionTitle: 'Счета',
        id: 'term-base-acc',
        title: 'Базовые счета',
        keywords: 'базовый счет зачисление пополнение usd eur без комиссии внешние средства'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-accounts', sectionTitle: 'Счета',
        id: 'term-limit-acc',
        title: 'Лимитные счета',
        keywords: 'лимитный счет карта баланс лимит собственный индивидуальный'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-accounts', sectionTitle: 'Счета',
        id: 'term-unified-acc',
        title: 'Единые лимитные счета',
        keywords: 'единый лимитный счет разные bin команда owner делегирование сотрудники'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-accounts', sectionTitle: 'Счета',
        id: 'term-shared-acc',
        title: 'Счета с общим балансом',
        keywords: 'общий баланс счет пул карты без лимитов eur bin'
    },

    // Карты и лимиты
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-cards', sectionTitle: 'Карты и лимиты',
        id: 'term-limit-cards',
        title: 'Лимитные карты',
        keywords: 'лимитные карты индивидуальный баланс пополнить лимит стартовый'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-cards', sectionTitle: 'Карты и лимиты',
        id: 'term-shared-cards',
        title: 'Карты с общим балансом',
        keywords: 'карты общий баланс без индивидуального лимита пул счет'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-cards', sectionTitle: 'Карты и лимиты',
        id: 'term-constant-limits',
        title: 'Постоянные лимиты',
        keywords: 'постоянный лимит фиксированный не сбрасывается вручную'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-cards', sectionTitle: 'Карты и лимиты',
        id: 'term-cycle-limits',
        title: 'Циклические лимиты',
        keywords: 'циклический лимит сброс день неделя месяц период транзакция bin'
    },

    // Команды и делегирование
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-team', sectionTitle: 'Команды и делегирование',
        id: 'term-roles',
        title: 'Команды и роли (Owner, Team Lead, Buyer, Farmer, Финансист)',
        keywords: 'роли owner team lead buyer farmer финансист команда права доступ подтверждение скрыт баланс уведомления'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-team', sectionTitle: 'Команды и делегирование',
        id: 'term-delegation',
        title: 'Делегирование',
        keywords: 'делегирование доступ счет сотрудник команда статистика карты'
    },

    // Операции и статистика
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-operations', sectionTitle: 'Операции и статистика',
        id: 'term-card-status',
        title: 'Статусы операций по картам',
        keywords: 'статус операция debit authorization declined charge refund холд авторизация отклонена возврат'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-operations', sectionTitle: 'Операции и статистика',
        id: 'term-acc-status',
        title: 'Статусы операций по счетам',
        keywords: 'типы операции счет перевод лимит комиссия штраф декалайн системные списания'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-operations', sectionTitle: 'Операции и статистика',
        id: 'term-stat-ops',
        title: 'Какие операции входят в статистику трат',
        keywords: 'статистика операции debit authorization refund декалайны не входят расходы'
    },
    {
        page: 'terminology', pageLabel: 'Терминология', pageUrl: 'terminology.html',
        sectionId: 'term-group-operations', sectionTitle: 'Операции и статистика',
        id: 'term-3ds',
        title: '3DS SMS, 3DS пароль, код авторизации',
        keywords: '3ds смс пароль код авторизации telegram бот одноразовый подтверждение bin google ads'
    },
];
