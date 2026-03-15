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
  title?: string; // 動画タイトル（任意）
};

export type SiteConfig = {
  brand: {
    headerLogo?: string; // ヘッダーロゴ画像パス（public/ 以下）例: "/images/brand/logo.png"
    logoAlt?: string; // ロゴ画像の alt テキスト（省略時は profile.name を使用）
  };
  activity: {
    municipalReport: {
      image?: string; // 画像パス（public/ 以下）例: "/images/activity/report.jpg"
      imageAlt?: string; // 画像の alt テキスト
      description: string; // 説明文
    };
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
    bio: string[]; // プロフィール本文（箇条書き）
    photo: string; // 顔写真パス（public/ 以下）
    catchcopy: string; // Hero キャッチコピー
    subcopy: string; // Hero サブコピー
    qualifications?: string[]; // 資格・試験リスト（任意）
    qualificationsIcon?: string; // 資格セクションアイコン画像パス（public/ 以下）例: "/images/profile/qualifications.png"
    hobbies?: string[]; // 趣味・特技リスト（任意）
    hobbiesIcon?: string; // 趣味セクションアイコン画像パス（public/ 以下）例: "/images/profile/hobbies.png"
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
    bio: [
      "1996年4月、愛媛県大洲市生まれ。",
      "大洲高校を経て、広島大学工学部、京都大学大学院情報学研究科を修了。",
      "アクセンチュア株式会社では、コンサルタントとして、公共事業領域を中心にテクノロジーを活用した課題解決に従事。",
      "2025年に退社後は、大洲市を拠点に地域の未来に向き合う活動を続けている。",
    ],
    photo: "/images/profile/profile.jpg",
    catchcopy: "いつまでも魅力的な大洲市に。",
    subcopy: "未来をひらく、あなたとともに。",
    qualifications: [
      "TOEIC 930",
      "応用情報技術者試験",
      "日商簿記 2級",
      "FP技能検定 2級",
      "証券外務員一種",
      "色彩検定 2級",
    ],
    // 画像ファイルを配置したら下の行のコメントを外してパスを設定してください
    // qualificationsIcon: "/images/profile/qualifications.png",
    hobbies: ["フルマラソン", "カヌー", "筋トレ", "居酒屋巡り", "読書", "旅行"],
    // hobbiesIcon: "/images/profile/hobbies.png",
  },
  policies: [
    {
      icon: "ComputerDesktopIcon",
      title: "IT活用で賢い財政運営",
      description:
        "市民の声を反映した「使われるサービス」で無駄を削減し、浮いた財源を市民の暮らしに再投資。",
    },
    {
      icon: "BuildingOfficeIcon",
      title: "若者が働けるまちづくり",
      description:
        "企業誘致とテレワーク拠点づくりで多様な仕事を創出し、人口流出に歯止めを掛ける。",
    },
    {
      icon: "HeartIcon",
      title: "医療・介護・移動支援で暮らし向上",
      description:
        "質の高い教育と在宅ケア、買い物・通院サポートで全世代が安心して暮らせる環境を整備。",
    },
    {
      icon: "MapIcon",
      title: "観光軸拡充で大洲の価値向上",
      description:
        "肱南と駅前を結ぶ観光ルートを核に誘客範囲を市内全域に広げ、地域経済を底上げ。",
    },
    {
      icon: "ShieldCheckIcon",
      title: "想定超災害に備える災害対策",
      description:
        "テクノロジーで被害予測と最適避難ルートの提示を可能とし、「想定外」の災害から命と暮らしを守る。",
    },
  ],
  video: {
    videos: [
      {
        youtubeVideoId: "pZFlAz39n6o",
        title: "政治をもっと身近に！",
      },
      {
        youtubeVideoId: "HPDoWxzRdBo",
        title: "市政を分かりやすく解説",
      },
    ],
  },
  xTimeline: {
    handle: "kkikuchi_maru", // X アカウント名（@ なし）を入力してください
  },
  activity: {
    municipalReport: {
      // 画像ファイルを配置したら下の行のコメントを外してパスを設定してください
      image: "/images/activity/report.jpg",
      imageAlt: "市政報告の様子",
      description:
        "市政報告を定期的に開催し、市政の動きを丁寧にお伝えしています。開催情報や詳しい内容は X・Facebook・Instagram などの各種 SNS でご案内していますので、ぜひフォローしてご確認ください。",
    },
  },
  donation: {
    url: "https://go2senkyo.com/donate/flow/196504",
    label: "活動を応援する",
    description:
      "菊地けんたの活動を応援してください。皆さまのご支援が、市民のための政治を実現します。",
  },
  sns: [
    {
      platform: "X",
      url: "https://x.com/kkikuchi_maru",
      order: 1,
      iconImage: "/images/social/x.png",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/kenta.kikuchi.9022",
      order: 2,
      iconImage: "/images/social/facebook.png",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/kkikuchi_maru/",
      order: 3,
      iconImage: "/images/social/instagram.png",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@%E8%8F%8A%E5%9C%B0%E3%81%91%E3%82%93%E3%81%9F%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB",
      order: 4,
      iconImage: "/images/social/youtube.png",
    },
    {
      platform: "選挙ドットコム",
      url: "https://go2senkyo.com/seijika/196504",
      order: 6,
      iconImage: "/images/social/senkyo.png",
    },
  ],
  footer: {
    copyright: "© 2026 Kenta Kikuchi. All rights reserved.",
    disclaimer:
      "本サイトは菊地けんたの政治活動に関する情報提供を目的としています。",
  },
};
