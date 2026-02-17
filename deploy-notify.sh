#!/bin/bash
#
# deploy-notify.sh — Уведомление Google и Яндекс/Bing об обновлениях сайта
#
# Использование:
#   ./deploy-notify.sh                          — пинг sitemap (Google + Yandex)
#   ./deploy-notify.sh https://dzamukov.com/blog/new-article/  — уведомить об одной странице
#   ./deploy-notify.sh url1 url2 url3           — уведомить о нескольких страницах
#

SITE="https://dzamukov.com"
SITEMAP="$SITE/sitemap.xml"
INDEXNOW_KEY="bf9ded352825a55992fd2b1eef729b20"

echo "=== Deploy Notify ==="
echo ""

# 1. Ping Google sitemap
echo "[Google] Пинг sitemap..."
GOOGLE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/ping?sitemap=$SITEMAP")
if [ "$GOOGLE_RESPONSE" = "200" ]; then
    echo "[Google] OK ($GOOGLE_RESPONSE)"
else
    echo "[Google] Ответ: $GOOGLE_RESPONSE"
fi

# 2. Ping Yandex sitemap
echo "[Yandex] Пинг sitemap..."
YANDEX_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://webmaster.yandex.ru/ping?sitemap=$SITEMAP")
if [ "$YANDEX_RESPONSE" = "200" ]; then
    echo "[Yandex] OK ($YANDEX_RESPONSE)"
else
    echo "[Yandex] Ответ: $YANDEX_RESPONSE"
fi

echo ""

# 3. IndexNow — если переданы конкретные URL
if [ $# -gt 0 ]; then
    echo "[IndexNow] Отправка $# URL..."
    echo ""

    # Формируем JSON массив URL
    URL_LIST=""
    for url in "$@"; do
        if [ -n "$URL_LIST" ]; then
            URL_LIST="$URL_LIST,"
        fi
        URL_LIST="$URL_LIST\"$url\""
    done

    JSON="{\"host\":\"dzamukov.com\",\"key\":\"$INDEXNOW_KEY\",\"urlList\":[$URL_LIST]}"

    # Отправляем в IndexNow (Yandex + Bing)
    for ENGINE in "yandex.com" "www.bing.com"; do
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
            -X POST "https://$ENGINE/indexnow" \
            -H "Content-Type: application/json" \
            -d "$JSON")
        echo "[IndexNow → $ENGINE] Ответ: $RESPONSE"
    done
else
    echo "[IndexNow] Для уведомления о конкретных страницах передайте URL аргументами:"
    echo "  ./deploy-notify.sh $SITE/blog/new-article/"
fi

echo ""
echo "=== Готово ==="
