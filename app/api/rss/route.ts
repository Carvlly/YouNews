import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html';

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded', 'content'],
  },
});

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(url);

    const items = feed.items.map((item) => {
      // 概要（description）の取得とサニタイズ
      const rawDescription = item.description || item['content:encoded'] || item.content || '';
      
      // HTMLタグを除去し、改行などを空白に置換
      const cleanDescription = sanitizeHtml(rawDescription, {
        allowedTags: [],
        allowedAttributes: {},
      }).replace(/\s+/g, ' ').trim();

      // 先頭100文字程度を抽出
      const truncatedDesc = cleanDescription.length > 100 
        ? cleanDescription.substring(0, 100) + '...'
        : cleanDescription;

      return {
        id: item.guid || (item as any).id || item.link || String(Math.random()),
        title: item.title || 'No title',
        link: item.link || '',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        description: truncatedDesc,
      };
    });

    return NextResponse.json({
      title: feed.title || 'Unknown Feed',
      items: items.slice(0, 100), // 最大100件
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });
  } catch (error) {
    console.error(`Failed to fetch RSS from ${url}:`, error);
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
  }
}
