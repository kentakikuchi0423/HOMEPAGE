export type Policy = {
  title: string; // 政策の題名
  description: string; // 説明文
};

export type SnsLink = {
  label: string; // 表示名（例: "X (Twitter)"）
  url: string;
  order: number; // 表示順（昇順）
  iconImage?: string; // アイコン画像のパス（public/ 以下。96px 四方の PNG）例: "/images/social/x.png"
  // 検索エンジン向けの「本人のプロフィールページ」一覧（構造化データの sameAs）に含めるか。
  // 友だち追加用の URL など、プロフィールページではないものは false にする（省略時は含める）
  isProfile?: boolean;
};

export type VideoItem = {
  youtubeVideoId: string; // YouTube 動画 ID（空文字はプレースホルダー表示）
  title?: string; // 動画タイトル（任意）
};

export type NavLink = {
  label: string; // 表示ラベル
  href: string; // リンク先（ページ内アンカー 例: "#profile"）
};

export type MessageParagraph = {
  text: string; // 段落の本文
  emphasis?: boolean; // true の場合、明朝体で大きく強調表示する
};

export type SectionHeadingText = {
  title: string; // セクション見出し（日本語）
  label: string; // 見出しの下に添える英字ラベル
};

export type SiteConfig = {
  headings: {
    profile: SectionHeadingText;
    policy: SectionHeadingText;
    video: SectionHeadingText;
    activity: SectionHeadingText;
    social: SectionHeadingText;
    donation: SectionHeadingText;
  };
  nav: {
    items: NavLink[]; // ヘッダーのナビゲーション項目（PC は横並び、スマホはメニュー内）
    cta: NavLink; // ヘッダー右端の強調ボタン
    homeLabel: string; // ロゴリンクの読み上げ用の補足（氏名の後ろに付く）
    mainNavLabel: string; // ナビゲーション（PC）の読み上げラベル
    mobileNavLabel: string; // ナビゲーション（スマホのメニュー）の読み上げラベル
    skipLabel: string; // キーボード操作用「本文へ移動」リンクの文言
    newTabLabel: string; // 外部リンクに付ける読み上げ用の補足
    menuOpenLabel: string; // スマホ用メニューボタンの読み上げラベル（開く）
    menuCloseLabel: string; // スマホ用メニューボタンの読み上げラベル（閉じる）
  };
  hero: {
    cta: NavLink; // Hero のボタン
  };
  message: {
    title: string; // セクション見出し
    label: string; // 見出しの下に添える英字ラベル
    paragraphs: MessageParagraph[]; // 挨拶文（段落ごと）
    signatureTitle: string; // 署名の肩書き
    signatureName: string; // 署名の氏名（署名画像の代替テキスト。画像が無い場合はこの文字を表示）
    signatureImage?: string; // 手書き署名の画像パス（public/ 以下。背景が透明な PNG）
    photo?: string; // 写真パス（public/ 以下）
    photoAlt?: string; // 写真の alt テキスト
  };
  brand: {
    headerLogo?: string; // ヘッダーロゴ画像パス（public/ 以下）例: "/images/brand/logo.png"
    logoAlt?: string; // ロゴ画像の alt テキスト（省略時は profile.name を使用）
  };
  activity: {
    municipalReport: {
      title: string; // カードの見出し
      image?: string; // 画像パス（public/ 以下）例: "/images/activity/report.jpg"
      imageAlt?: string; // 画像の alt テキスト
      description: string; // 説明文
    };
    labels: {
      more: string; // 一覧の末尾に出す「もっと見る」リンクの文言
      loadError: string; // 投稿を取得できなかったときの文言
      fallbackLink: string; // 取得できなかったときに出すリンクの文言
    };
    rss?: {
      title: string; // カードの見出し
      url: string; // 取得する RSS フィードの URL（Netlify Function が取得する）
      endpoint: string; // ブラウザが呼び出す Netlify Function のパス
      limit: number; // 表示件数
      baseUrl: string; // 「もっと見る」のリンク先。相対リンクの基準にも使う
      // 外部データの安全対策：ここに挙げたホスト（サブドメインを含む）の https だけを通す。
      // imageHosts を変える場合は、netlify.toml の Content-Security-Policy（img-src）も合わせて変える
      linkHosts: string[]; // リンクとして許可するホスト
      imageHosts: string[]; // 画像として許可するホスト
    };
  };
  meta: {
    title: string; // ブラウザタブ・OGP タイトル
    description: string; // OGP 説明
    url: string; // 本番 URL（https://...）
    ogImage: string; // OGP 画像パス（public/ 以下。1200×630px）
    ogImageAlt: string; // OGP 画像の説明文
    appIcon: string; // ホーム画面に追加したときのアイコン（public/ 以下。512px 四方の PNG）
    themeColor: string; // ブラウザの枠などに使う色（globals.css の brand と揃える）
    backgroundColor: string; // 起動時の背景色
    googleSiteVerification?: string; // Google Search Console の所有権確認コード
    siteName: string; // サイト名（og:site_name・WebSite schema の name に使用）
    siteNameAlt?: string[]; // サイト名の別表記（WebSite schema の alternateName）
    shortName: string; // ホーム画面に追加したときの短い名前（マニフェスト）
    person: {
      // 検索エンジン向けの人物情報（構造化データ）
      name: string; // 氏名（正式表記）
      alternateNames: string[]; // 氏名の別表記
      jobTitle: string; // 役職
      homeLocation: string; // 活動地域
      description: string; // 人物の紹介文（1〜2 文）
    };
  };
  profile: {
    name: string; // 氏名（漢字）
    nameKana: string; // 氏名（ふりがな）
    title: string; // 肩書き（例："○○市議会議員候補"）
    bio: string[]; // プロフィール本文（箇条書き）
    photo: string; // 顔写真パス（public/ 以下）
    catchcopy: string; // Hero キャッチコピー
    subcopy: string; // Hero サブコピー
    qualificationsTitle: string; // 資格欄の見出し
    qualifications?: string[]; // 資格・試験リスト（任意）
    hobbiesTitle: string; // 趣味欄の見出し
    hobbies?: string[]; // 趣味・特技リスト（任意）
    snapshot?: string; // プロフィール欄に添える写真パス（public/ 以下）
    snapshotAlt?: string; // 上記写真の alt テキスト
  };
  policies: Policy[];
  video: {
    videos: VideoItem[]; // YouTube 動画リスト
    playLabel: string; // 再生ボタンの読み上げラベル
    fallbackTitle: string; // タイトル未設定時の読み上げ用タイトル
    placeholder: string; // 動画 ID 未設定時の表示文言
  };
  donation: {
    url: string; // 外部寄付ページ URL
    label: string; // CTA ボタンラベル
    description?: string; // セクション説明文（任意。\\n で改行）
  };
  sns: SnsLink[];
  footer: {
    copyright: string; // コピーライト文
    disclaimer?: string; // 免責文（任意）
  };
  notFound: {
    code: string; // 見出しの上に添える番号
    title: string; // 存在しないページの見出し
    message: string; // 説明文
    linkLabel: string; // トップページへ戻るリンクの文言
  };
};

export const siteConfig: SiteConfig = {
  headings: {
    profile: { title: "プロフィール", label: "PROFILE" },
    policy: { title: "政策", label: "POLICY" },
    video: { title: "動画", label: "VIDEO" },
    activity: { title: "活動報告", label: "ACTIVITY" },
    social: { title: "SNS・リンク", label: "CONNECT" },
    donation: { title: "ご支援のお願い", label: "SUPPORT" },
  },
  nav: {
    items: [
      { label: "ごあいさつ", href: "#message" },
      { label: "プロフィール", href: "#profile" },
      { label: "政策", href: "#policy" },
      { label: "動画", href: "#video" },
      { label: "活動報告", href: "#activity" },
      { label: "SNS", href: "#social" },
    ],
    cta: { label: "応援する", href: "#donation" },
    homeLabel: "トップへ戻る",
    mainNavLabel: "メインメニュー",
    mobileNavLabel: "メニュー",
    skipLabel: "本文へ移動",
    newTabLabel: "新しいタブで開きます",
    menuOpenLabel: "メニューを開く",
    menuCloseLabel: "メニューを閉じる",
  },
  hero: {
    cta: { label: "ごあいさつを読む", href: "#message" },
  },
  message: {
    title: "ごあいさつ",
    label: "MESSAGE",
    paragraphs: [
      { text: "はじめまして。大洲市議会議員の菊地謙太です。" },
      {
        text: "私は愛媛県大洲市で生まれ育ち、大学進学を機に地元を離れました。その後、コンサルティング企業で公共分野を中心に、デジタル技術を活用した業務改善や課題解決に携わってきました。",
      },
      {
        text: "そんな中、幼い頃から親しんできたショッピングセンターの閉店や、母校を含む高校の統合の話を耳にし、ふるさと大洲の変化を強く実感しました。",
      },
      {
        text: "「大好きな大洲の未来のために、自分にも何かできるのでは。」",
        emphasis: true,
      },
      {
        text: "その想いが次第に強くなり、2025年に市議会議員選挙への挑戦を決意しました。",
      },
      {
        text: "私が大切にしているのは、市民の皆さまの声に耳を傾け、課題から目を背けず、行動し続けることです。",
      },
      {
        text: "これまでの経験と新しい視点を生かし、誰もが希望を持って暮らせる大洲市を目指してまいります。",
      },
    ],
    signatureTitle: "大洲市議会議員",
    signatureName: "菊地 謙太",
    signatureImage: "/images/profile/signature.png",
    photo: "/images/profile/council.jpg",
    photoAlt: "大洲市議会の一般質問で登壇する菊地けんた",
  },
  brand: {
    // 画像ファイルを配置したら下の行のコメントを外してパスを設定してください
    // headerLogo: "/images/brand/logo.png",
    // logoAlt: "菊地けんた 公式ロゴ",
  },
  meta: {
    title: "菊地けんた公式サイト｜大洲市議会議員",
    description:
      "愛媛県大洲市議会議員 菊地けんた（菊地謙太）の公式サイトです。ごあいさつ、プロフィール、政策、市政報告など、日々の活動をお届けします。",
    url: "https://kikuchi-kenta.jp/",
    ogImage: "/images/brand/ogp.png",
    ogImageAlt: "大洲市議会議員 菊地けんた　いつまでも魅力的な大洲市に。",
    appIcon: "/images/brand/favicon.png",
    themeColor: "#1e50a2",
    backgroundColor: "#ffffff",
    googleSiteVerification: "zqTfq7juOXzHoucWwhmaqSDCMlXNwyAbmVVkqWKB9ig",
    siteName: "菊地けんた公式サイト",
    siteNameAlt: [
      "菊地けんた（菊地謙太）公式サイト",
      "菊地謙太公式サイト",
      "キクチケンタ公式サイト",
    ],
    shortName: "菊地けんた",
    person: {
      name: "菊地謙太",
      alternateNames: ["菊地けんた", "きくちけんた", "キクチケンタ", "Kenta Kikuchi"],
      jobTitle: "大洲市議会議員",
      homeLocation: "愛媛県大洲市",
      description:
        "愛媛県大洲市議会議員。大洲市出身、1996年生まれ。コンサルティング企業で公共分野のDXに携わったのち、2025年から大洲市で活動。",
    },
  },
  profile: {
    name: "菊地 けんた",
    nameKana: "KIKUCHI KENTA",
    title: "大洲市議会議員",
    bio: [
      "愛媛県大洲市出身、1996年生まれ。",
      "広島大学工学部・京都大学大学院情報学研究科修了。",
      "アクセンチュア株式会社にてコンサルタントとして、公共領域のDXに従事。",
      "2025年に退社し、大洲市にて故郷の未来に向き合う活動を開始。",
    ],
    photo: "/images/profile/profile.jpg",
    catchcopy: "いつまでも魅力的な大洲市に。",
    subcopy: "未来をひらく、あなたとともに。",
    qualificationsTitle: "資格・試験",
    qualifications: [
      "TOEIC 930",
      "応用情報技術者試験",
      "日商簿記 2級",
      "FP技能検定 2級",
      "証券外務員一種",
      "防災士",
      "ウイスキー検定 2級",
      "おおず歴史華回廊案内人",
    ],
    hobbiesTitle: "趣味・特技",
    hobbies: ["フルマラソン", "カヌー", "筋トレ", "居酒屋巡り", "読書", "旅行"],
    snapshot: "/images/profile/cycling.jpg",
    snapshotAlt: "ツール・ド・ひじかわで自転車に乗る菊地けんた",
  },
  policies: [
    {
      title: "IT活用で賢い財政運営",
      description:
        "市民の声を反映した「使われるサービス」で無駄を削減し、浮いた財源を市民の暮らしに再投資。",
    },
    {
      title: "若者が働けるまちづくり",
      description:
        "企業誘致とテレワーク拠点づくりで多様な仕事を創出し、人口流出に歯止めを掛ける。",
    },
    {
      title: "医療・介護・移動支援で暮らし向上",
      description:
        "質の高い教育と在宅ケア、買い物・通院サポートで全世代が安心して暮らせる環境を整備。",
    },
    {
      title: "観光軸拡充で大洲の価値向上",
      description:
        "肱南と駅前を結ぶ観光ルートを核に誘客範囲を市内全域に広げ、地域経済を底上げ。",
    },
    {
      title: "想定超災害に備える災害対策",
      description:
        "テクノロジーで被害予測と最適避難ルートの提示を可能とし、「想定外」の災害から命と暮らしを守る。",
    },
  ],
  video: {
    playLabel: "動画を再生",
    fallbackTitle: "YouTube 動画",
    placeholder: "動画は準備中です",
    videos: [
      {
        youtubeVideoId: "pZFlAz39n6o",
        title: "政治をもっと身近に！",
      },
      {
        youtubeVideoId: "HPDoWxzRdBo",
        title: "政治をもっと分かりやすく！",
      },
      {
        youtubeVideoId: "pWiOuCa7Q3w",
        title: "暮らしをもっと便利に！",
      },
    ],
  },
  activity: {
    municipalReport: {
      title: "市政報告",
      image: "/images/activity/report.jpg",
      imageAlt: "市政報告の様子",
      description:
        "市政報告を定期的に開催し、市政の動きを丁寧にお伝えしています。開催情報や詳しい内容は X・Facebook・Instagram などの各種 SNS でご案内していますので、ぜひフォローしてご確認ください。",
    },
    labels: {
      more: "活動をもっと見る",
      loadError: "投稿を読み込めませんでした",
      fallbackLink: "選挙ドットコムで見る",
    },
    rss: {
      title: "最新の活動",
      url: "https://www.go2senkyo.com/seijika/196504/posts.rss",
      endpoint: "/.netlify/functions/go2senkyo-rss",
      limit: 10,
      baseUrl: "https://go2senkyo.com/seijika/196504/posts",
      linkHosts: ["go2senkyo.com"],
      imageHosts: ["go2senkyo.com", "go2senkyo-com-production-1.s3.ap-northeast-1.amazonaws.com"],
    },
  },
  donation: {
    url: "https://go2senkyo.com/donate/flow/196504",
    label: "活動を応援する",
    description:
      "皆さまと一緒に考え、一緒に行動しながら、地域の未来をつくっていきたいと考えています。\n日々の取り組みに共感いただけましたら、応援していただけると大きな励みになります。",
  },
  sns: [
    {
      label: "X (Twitter)",
      url: "https://x.com/kkikuchi_maru",
      order: 1,
      iconImage: "/images/social/x.png",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/kenta.kikuchi.9022",
      order: 2,
      iconImage: "/images/social/facebook.png",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/kkikuchi_maru/",
      order: 3,
      iconImage: "/images/social/instagram.png",
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/@%E8%8F%8A%E5%9C%B0%E3%81%91%E3%82%93%E3%81%9F%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB",
      order: 4,
      iconImage: "/images/social/youtube.png",
    },
    {
      label: "LINE",
      isProfile: false, // 友だち追加用の URL のため
      url: "https://line.me/R/ti/p/@512nbxiw",
      order: 5,
      iconImage: "/images/social/line.png",
    },
    {
      label: "選挙ドットコム",
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
  notFound: {
    code: "404",
    title: "ページが見つかりません",
    message:
      "お探しのページは、移動または削除された可能性があります。",
    linkLabel: "トップページへ戻る",
  },
};
