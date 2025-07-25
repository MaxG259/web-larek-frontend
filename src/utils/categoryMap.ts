/*
 * Утилита для маппинга категорий товаров.
 * Преобразует названия категорий в CSS классы для стилизации.
 */

export const categoryMap: Record<string, string> = {
  'софт-скилл': 'soft',
  'софт-скил': 'soft',
  'soft': 'soft',
  'другое': 'other',
  'other': 'other',
  'хард-скилл': 'hard',
  'хард-скил': 'hard',
  'hard': 'hard',
  'дополнительно': 'additional',
  'additional': 'additional',
  'кнопка': 'button',
  'button': 'button'
}; 