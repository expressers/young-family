/*
  CATÁLOGO DA LOJA
  ----------------
  Para editar produtos, preços, cores ou fotos, mexe só neste ficheiro.

  - price: em Kwanzas (número inteiro, sem pontos).
  - photos: quando houver fotografias reais, coloca-as em /public/media/loja/
    e lista-as aqui (ex.: ['/media/loja/bone-dn-preto-1.jpg']). Se existirem,
    substituem o desenho técnico na página do produto.
  - status: 'disponivel' | 'pre-encomenda' | 'esgotado'
*/

export type Style = 'dad' | 'trucker' | 'bucket' | 'beanie' | 'snapback' | 'balaclava'

export type Colorway = {
  id: string
  name: string
  base: string // cor principal do chapéu
  accent: string // cor do bordado / detalhe
  photos?: string[]
}

export type Product = {
  slug: string
  name: string
  category: CategoryId
  style: Style
  mark: string // texto bordado no desenho
  price: number
  status: 'disponivel' | 'pre-encomenda' | 'esgotado'
  tagline: string
  description: string
  details: string[]
  sizes: string[]
  colorways: Colorway[]
  lookbook?: { src: string; caption: string }
}

export type CategoryId = 'chapeus' | 'vestuario' | 'acessorios' | 'musica'

export const CATEGORIES: { id: CategoryId; label: string; soon?: boolean }[] = [
  { id: 'chapeus', label: 'Chapéus' },
  { id: 'vestuario', label: 'Vestuário', soon: true },
  { id: 'acessorios', label: 'Acessórios', soon: true },
  { id: 'musica', label: 'Música', soon: true },
]

export const SHOP = {
  // Mostra o aviso de catálogo provisório. Põe false quando houver fotos e preços finais.
  preview: true,
  // Número que recebe as encomendas por WhatsApp (só dígitos, com indicativo).
  whatsapp: '244946708501',
  currency: 'Kz',
  delivery: [
    { id: 'luanda', label: 'Entrega em Luanda', note: 'Prazo confirmado por WhatsApp', fee: 2000 },
    { id: 'levantamento', label: 'Levantamento', note: 'Local e hora combinados por WhatsApp', fee: 0 },
    { id: 'provincias', label: 'Outras províncias', note: 'Custo de envio combinado por WhatsApp', fee: null },
  ] as { id: string; label: string; note: string; fee: number | null }[],
  payment: [
    { id: 'mcx', label: 'Multicaixa Express', note: 'Recebes os dados de pagamento no WhatsApp' },
    { id: 'transferencia', label: 'Transferência bancária', note: 'IBAN enviado com a confirmação' },
    { id: 'entrega', label: 'Pagamento na entrega', note: 'Só em Luanda' },
  ],
}

const INK = '#141210'
const BONE = '#e9e1d3'
const BLOOD = '#c8141f'
const SAND = '#b8a587'
const OLIVE = '#4b4a3a'

export const PRODUCTS: Product[] = [
  {
    slug: 'bone-don-and-don',
    name: 'Boné Don & Don',
    category: 'chapeus',
    style: 'dad',
    mark: 'D&N',
    price: 15000,
    status: 'pre-encomenda',
    tagline: 'O boné do álbum.',
    description:
      'Dad cap de seis painéis com o monograma D&N bordado à frente. A peça que fecha qualquer fit da era Don & Don — discreto de longe, inconfundível de perto.',
    details: ['Algodão sarjado lavado', 'Bordado 3D à frente, “YF” atrás', 'Fivela metálica ajustável', 'Aba curva pré-moldada'],
    sizes: ['Único (ajustável)'],
    colorways: [
      { id: 'preto', name: 'Preto / Vermelho', base: INK, accent: BLOOD },
      { id: 'osso', name: 'Osso / Preto', base: BONE, accent: INK },
      { id: 'vermelho', name: 'Vermelho / Osso', base: '#9e1018', accent: BONE },
    ],
    lookbook: { src: '/media/colete.jpg', caption: 'Fotograma de “Don&Don (Still Trappin)”' },
  },
  {
    slug: 'trucker-yf',
    name: 'Trucker YF',
    category: 'chapeus',
    style: 'trucker',
    mark: 'YF',
    price: 13000,
    status: 'pre-encomenda',
    tagline: 'Frente em espuma, rede atrás, apelido à vista.',
    description:
      'O clássico trucker com o YF em grande na frente. Leve, fresco para o calor de Luanda e feito para se ver no meio da multidão.',
    details: ['Frente em espuma, painéis traseiros em rede', 'Estampa YF em relevo', 'Fecho snapback', 'Aba curva'],
    sizes: ['Único (ajustável)'],
    colorways: [
      { id: 'preto', name: 'Preto', base: INK, accent: BONE },
      { id: 'branco', name: 'Branco / Vermelho', base: '#efe9de', accent: BLOOD },
    ],
    lookbook: { src: '/media/morenas.jpg', caption: 'Fotograma de “Morenas de Benguela”' },
  },
  {
    slug: 'snapback-still-trappin',
    name: 'Snapback Still Trappin',
    category: 'chapeus',
    style: 'snapback',
    mark: 'STILL TRAPPIN',
    price: 18000,
    status: 'pre-encomenda',
    tagline: 'Aba reta. Atitude também.',
    description:
      'Estrutura alta, aba reta e “Still Trappin” bordado a vermelho-sangue, como no título do vídeo. A peça de colecção da primeira tiragem.',
    details: ['Copa estruturada de seis painéis', 'Bordado 3D vermelho', 'Aba reta com forro contrastante', 'Fecho snapback'],
    sizes: ['Único (ajustável)'],
    colorways: [
      { id: 'preto', name: 'Preto / Vermelho', base: INK, accent: BLOOD },
      { id: 'betao', name: 'Betão / Preto', base: '#8a857c', accent: INK },
    ],
    lookbook: { src: '/media/shadows.jpg', caption: 'Fotograma de “Don&Don (Still Trappin)”' },
  },
  {
    slug: 'bucket-luanda',
    name: 'Bucket Luanda',
    category: 'chapeus',
    style: 'bucket',
    mark: 'LUANDA',
    price: 14000,
    status: 'pre-encomenda',
    tagline: 'Sol de Luanda, sombra da família.',
    description:
      'Bucket hat em sarja pesada com “Luanda” bordado à frente e o YF na lateral. Aba larga, costuras em anel e caimento firme.',
    details: ['Sarja de algodão pesada', 'Bordado frontal e lateral', 'Costuras em anel na aba', 'Ilhós de ventilação'],
    sizes: ['S/M', 'L/XL'],
    colorways: [
      { id: 'preto', name: 'Preto', base: INK, accent: BONE },
      { id: 'areia', name: 'Areia', base: SAND, accent: INK },
      { id: 'oliva', name: 'Oliva', base: OLIVE, accent: BONE },
    ],
    lookbook: { src: '/media/familia-bw.jpg', caption: 'Fotograma de “Belaire Boyz”' },
  },
  {
    slug: 'gorro-familia',
    name: 'Gorro Família',
    category: 'chapeus',
    style: 'beanie',
    mark: 'FAMÍLIA',
    price: 12000,
    status: 'pre-encomenda',
    tagline: 'Para as noites de estúdio.',
    description:
      'Gorro de malha canelada com dobra larga e etiqueta tecida “Família”. O mesmo apelido, agora para usar na cabeça.',
    details: ['Malha canelada acrílica macia', 'Dobra dupla', 'Etiqueta tecida frontal', 'Tamanho único elástico'],
    sizes: ['Único'],
    colorways: [
      { id: 'preto', name: 'Preto', base: '#1a1816', accent: BLOOD },
      { id: 'vermelho', name: 'Vermelho', base: '#a5121b', accent: BONE },
    ],
    lookbook: { src: '/media/azul.jpg', caption: 'Fotograma de “Belaire Boyz”' },
  },
  {
    slug: 'balaclava-still-trappin',
    name: 'Balaclava Still Trappin',
    category: 'chapeus',
    style: 'balaclava',
    mark: 'D&N',
    price: 9000,
    status: 'pre-encomenda',
    tagline: 'O figurino do vídeo.',
    description:
      'Balaclava de malha fina com abertura para os olhos e monograma D&N bordado. Saiu diretamente do figurino de “Don&Don (Still Trappin)”.',
    details: ['Malha fina respirável', 'Abertura para os olhos', 'Monograma D&N bordado', 'Tamanho único'],
    sizes: ['Único'],
    colorways: [{ id: 'preto', name: 'Preto', base: '#121110', accent: BLOOD }],
    lookbook: { src: '/media/balaclava.jpg', caption: 'Fotograma de “Don&Don (Still Trappin)”' },
  },
]

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)

export const formatKz = (n: number) =>
  `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Kz`
