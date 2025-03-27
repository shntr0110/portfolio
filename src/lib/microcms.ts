// SDK利用準備
import type { MicroCMSListContent, MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
export type Works = {
  id?: string;
  title: string;
  titleSub: string;
  thumbnail?:
    | {
        url?: string;
      }
    | undefined;
} & MicroCMSListContent;

// APIの呼び出し
export const getWorks = async (queries?: MicroCMSQueries) => {
  return await client.getList<Works>({ endpoint: 'works', queries });
};

export const getWorkDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return await client.getListDetail<Works>({
    endpoint: 'works',
    contentId,
    queries,
  });
};
