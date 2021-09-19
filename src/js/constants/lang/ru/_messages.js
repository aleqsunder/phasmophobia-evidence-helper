export default {
    // Тип языка
    name: 'Русский',
    flag: 'ru',

    // Заголовки
    selectedEvidence: 'Выбранные улики',
    allEvidence: 'Все улики',
    ghosts: 'Призраки',

    // Ошибки
    noEvidenceSelected: 'Не выбрано ни одной улики',
    emptyGhostList: evidence => `${evidence}: добавление данного пункта приведёт к пустому списку призраков`,
    languageNotSupported: 'Данный язык не поддерживается',
    empty: 'Пусто',
}