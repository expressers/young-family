export const LINKS = {
  appleAlbum: 'https://music.apple.com/pt/album/don-don/1858971143',
  youtube: 'https://www.youtube.com/@youngfamily5867',
  instagram: 'https://www.instagram.com/youngfamilyoficiall/',
  tiktok: 'https://www.tiktok.com/@youngfamilyoficiall',
  x: 'https://x.com/young_family_',
  lilBoy: 'https://www.instagram.com/lilboy_thedon/',
  whatsapp: 'https://wa.me/244946708501',
  phone: 'tel:+244946708501',
  phoneLabel: '+244 946 708 501',
}

export const BILLING = [
  'Lil Boy',
  'Lil Mac',
  'Okénio M',
  'Deivly',
  'Fábio Freitas',
  'Lil Fox',
  'Nello Boy',
  'Lil Drizzy',
]

export type Member = { name: string; alias?: string; note?: string }

export const CAST: Member[] = [
  { name: 'Lil Boy', alias: 'Beezy', note: 'Don' },
  { name: 'Lil Mac', alias: 'Daiquiri', note: 'Don' },
  { name: 'Okénio M', alias: 'Mugabe' },
  { name: 'Lil Fox', alias: 'Freezy' },
  { name: 'Deivly' },
  { name: 'Fábio Freitas' },
  { name: 'Nello Boy' },
  { name: 'Lil Drizzy', note: 'Entrou para a família em Dezembro de 2025' },
]

export const FEATURES = [
  'Kelson Most Wanted',
  'Prodígio',
  'Tayo Music',
  'Micha Star',
  'Boss Alírio',
  'Bráulio ZP',
  'YunLilo',
  "A'Aires",
  'Lipesky',
  'Edilasio',
  'Polaco',
  'Ricky $tar',
]

export type Track = { n: number; title: string; feat?: string; still: string }

export const TRACKS: Track[] = [
  { n: 1, title: 'Beep Beep', feat: 'Kelson Most Wanted & Deivly', still: '/media/carros.jpg' },
  { n: 2, title: 'Belaire Boyz', still: '/media/club.jpg' },
  { n: 3, title: 'Acelerati', feat: 'Tayo Music', still: '/media/azul.jpg' },
  { n: 4, title: 'Top 5', feat: "A'Aires & Lipesky", still: '/media/microfone-bw.jpg' },
  { n: 5, title: 'Pandora', still: '/media/olhar.jpg' },
  { n: 6, title: 'Estou Errado', still: '/media/teal.jpg' },
  { n: 7, title: 'Descontrolas', feat: 'Edilasio, 400 & Okénio M', still: '/media/brinde.jpg' },
  { n: 8, title: 'Lux Rare', feat: 'Boss Alírio', still: '/media/mesa.jpg' },
  { n: 9, title: 'Mó Trem', still: '/media/leather.jpg' },
  { n: 10, title: 'Don&Don (Still Trappin)', still: '/media/shadows.jpg' },
  { n: 11, title: 'Terrace POV', feat: 'Polaco & Nello Boy', still: '/media/escadas.jpg' },
  { n: 12, title: 'Bellingham', feat: 'Micha Star & Lil Drizzy', still: '/media/balaclava.jpg' },
]

export type Film = {
  id: string
  title: string
  credit: string
  year: string
  views: string
  still: string
}

export const FILMS: Film[] = [
  { id: 'B9dH_1Zmr4k', title: 'Belaire Boyz', credit: 'Lil Boy & Lil Mac', year: 'Don & Don', views: '1,4 M', still: '/media/club.jpg' },
  { id: 'butODN5-XtQ', title: 'Still Trappin', credit: 'Lil Boy & Lil Mac', year: 'Don & Don', views: '715 mil', still: '/media/colete.jpg' },
  { id: '9eEx_X-X224', title: 'Segue Vem!', credit: 'Young Family', year: '2018', views: '1,5 M', still: '/media/segue.jpg' },
  { id: 'xRU8fseZynA', title: 'No Cap', credit: 'Okénio M & Lil Mac', year: '2019', views: '1,1 M', still: '/media/nocap.jpg' },
  { id: 'wrJV36PPHhA', title: 'Morenas de Benguela', credit: 'Young Family', year: '2022', views: '1 M', still: '/media/morenas.jpg' },
  { id: 'Jdg60_Sn-C8', title: 'Wis do Momento', credit: 'Young Family', year: '2024', views: '963 mil', still: '/media/wis.jpg' },
  { id: 'WVMJrc4d7N0', title: 'Loroo Piana', credit: 'Young Family ft. YunLilo', year: '2020', views: '934 mil', still: '/media/yt-WVMJrc4d7N0.jpg' },
  { id: 'RHnHXFvc5CM', title: 'Falta Gás', credit: 'Young Family', year: '2020', views: '912 mil', still: '/media/yt-RHnHXFvc5CM.jpg' },
  { id: 'ZDRQeAv1X3g', title: 'Pedrinha', credit: 'Young Family ft. Bráulio ZP', year: '2021', views: '896 mil', still: '/media/pedrinha.jpg' },
  { id: 'qniM9CwJy88', title: 'Nova Febre', credit: 'Okénio M & Lil Mac ft. Fábio Freitas', year: '2019', views: '767 mil', still: '/media/febre.jpg' },
]
