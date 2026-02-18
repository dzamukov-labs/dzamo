<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
    <title>Карта сайта — dzamukov.com</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0c0b0a;
            color: #f0ece4;
            padding: 40px 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        h1 {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 8px;
            color: #c8a96e;
        }
        .subtitle {
            font-size: 13px;
            color: #7a746a;
            margin-bottom: 32px;
        }
        table { width: 100%; border-collapse: collapse; }
        th {
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #7a746a;
            padding: 12px 16px;
            border-bottom: 1px solid #1e1c1a;
        }
        td {
            padding: 12px 16px;
            font-size: 14px;
            border-bottom: 1px solid #1e1c1a;
            vertical-align: top;
        }
        tr:hover td { background: #131211; }
        a { color: #f0ece4; text-decoration: none; }
        a:hover { color: #c8a96e; }
        .date { color: #7a746a; font-size: 13px; white-space: nowrap; }
        .langs { font-size: 12px; color: #7a746a; }
        .langs a { color: #7a746a; text-decoration: underline; }
        .langs a:hover { color: #c8a96e; }
        .count {
            font-size: 13px;
            color: #7a746a;
            margin-bottom: 24px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Карта сайта</h1>
        <p class="subtitle">dzamukov.com</p>
        <p class="count">Страниц: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
        <table>
            <tr>
                <th>URL</th>
                <th>Дата</th>
                <th>Языки</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                    <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td class="date"><xsl:value-of select="sitemap:lastmod"/></td>
                    <td class="langs">
                        <xsl:for-each select="xhtml:link[@rel='alternate']">
                            <xsl:if test="position() > 1"> · </xsl:if>
                            <a href="{@href}"><xsl:value-of select="@hreflang"/></a>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
