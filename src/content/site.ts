export type Policy = {
  icon: string; // 絵文字フォールバック識別子
  iconImage?: string; // 画像パス（public/ 以下）例: "/images/policy/education.png"
  title: string;
  description: string;
};

export type SnsLink = {
  platform: "X" | "Instagram" | "Facebook" | "YouTube" | "選挙ドットコム";
  url: string;
  order: number; // 表示順（昇順）
  iconImage?: string; // 画像パス（public/ 以下）例: "/images/social/x.png"
};

export type VideoItem = {
  youtubeVideoId: string; // YouTube 動画 ID（空文字はプレースホルダー表示）
  title?: string;         // 動画タイトル（任意）
};

export type SiteConfig = {
  brand: {
    headerLogo?: string; // ヘッダーロゴ画像パス（public/ 以下）例: "/images/brand/logo.png"
    logoAlt?: string;    // ロゴ画像の alt テキスト（省略時は profile.name を使用）
  };
  meta: {
    title: string; // ブラウザタブ・OGP タイトル
    description: string; // OGP 説明
    url: string; // 本番 URL（https://...）
    ogImage: string; // OGP 画像パス（public/ 以下）
    favicon: string; // favicon 画像パス（public/ 以下）例: "/images/brand/favicon.png"
  };
  profile: {
    name: string; // 氏名（漢字）
    nameKana: string; // 氏名（ふりがな）
    title: string; // 肩書き（例："○○市議会議員候補"）
    bio: string; // プロフィール本文
    photo: string; // 顔写真パス（public/ 以下）
    catchcopy: string; // Hero キャッチコピー
    subcopy: string; // Hero サブコピー
  };
  policies: Policy[];
  video: {
    videos: VideoItem[]; // YouTube 動画リスト（最大2本）
  };
  xTimeline: {
    handle: string; // X アカウント名（@ なし）
    tweetLimit?: number; // 表示件数（省略時は X ウィジェットデフォルト）
  };
  donation: {
    url: string; // 外部寄付ページ URL
    label: string; // CTA ボタンラベル
    description?: string; // セクション説明文（任意）
  };
  sns: SnsLink[];
  footer: {
    copyright: string; // コピーライト文
    disclaimer?: string; // 免責文（任意）
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    // 画像ファイルを配置したら下の行のコメントを外してパスを設定してください
    // headerLogo: "/images/brand/logo.png",
    // logoAlt: "菊地けんた 公式ロゴ",
  },
  meta: {
    title: "菊地けんた 公式サイト",
    description: "菊地けんたの政治活動プロフィールサイトです。",
    url: "https://example.com",
    ogImage: "/images/brand/ogp.png",
    favicon: "/images/brand/favicon.png",
  },
  profile: {
    name: "菊地 けんた",
    nameKana: "KIKUCHI KENTA",
    title: "大洲市議会議員",
    bio: "○○市生まれ、○○大学卒業。市民の声を政治に届けるため、地域に根ざした活動を続けています。子育て・教育・地域経済の活性化を最重要テーマとして掲げています。",
    photo: "/images/profile/profile.jpg",
    catchcopy: "いつまでも魅力的な大洲市に。",
    subcopy: "未来をひらく、あなたとともに。",
  },
  policies: [
    {
      icon: "AcademicCapIcon",
      title: "子育て・教育の充実",
      description:
        "保育所・学童の拡充と教育費の無償化を推進し、すべての子どもが笑顔で育てる環境をつくります。",
    },
    {
      icon: "BuildingOfficeIcon",
      title: "地域経済の活性化",
      description:
        "地元中小企業への支援強化と空き店舗活用で、地域に活気とにぎわいを取り戻します。",
    },
    {
      icon: "HeartIcon",
      title: "高齢者・福祉の向上",
      description:
        "在宅介護支援の拡充と地域包括ケアの整備で、安心して年を重ねられる○○市をめざします。",
    },
    {
      icon: "LeafIcon",
      title: "環境・防災まちづくり",
      description:
        "再生可能エネルギーの導入促進と防災インフラ整備で、持続可能で強いまちをつくります。",
    },
  ],
  video: {
    videos: [
      { youtubeVideoId: "", title: "菊地けんた 政策紹介動画" },
      { youtubeVideoId: "", title: "菊地けんた 活動レポート" },
    ],
  },
  xTimeline: {
    handle: "kenta_kikuchi", // X アカウント名（@ なし）を入力してください
  },
  donation: {
    url: "#",
    label: "活動を応援する",
    description:
      "菊地けんたの活動を応援してください。皆さまのご支援が、市民のための政治を実現します。",
  },
  sns: [
    { platform: "X", url: "#", order: 1, iconImage: "/images/social/x.png" },
    { platform: "Facebook", url: "#", order: 2, iconImage: "/images/social/facebook.png" },
    { platform: "Instagram", url: "#", order: 3, iconImage: "/images/social/instagram.png" },
    { platform: "YouTube", url: "#", order: 4, iconImage: "/images/social/youtube.png" },
    { platform: "選挙ドットコム", url: "#", order: 6, iconImage: "/images/social/senkyo.png" },
  ],
  footer: {
    copyright: "© 2026 菊地けんた",
    disclaimer:
      "本サイトは菊地けんたの政治活動に関する情報提供を目的としています。",
  },
};
