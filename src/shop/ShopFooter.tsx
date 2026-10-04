import { Link } from '../router'
import { LINKS } from '../data'
import { SHOP } from './catalog'
import { ArrowUpRight } from '../sections/Icons'

export default function ShopFooter() {
  return (
    <footer className="footer shop-footer">
      <div className="ft-top">
        <Link className="ft-mark display" to="/">
          YF.
        </Link>
        <ul className="ft-social">
          <li>
            <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
              Dúvidas no WhatsApp <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight />
            </a>
          </li>
          <li>
            <a href={LINKS.tiktok} target="_blank" rel="noreferrer">
              TikTok <ArrowUpRight />
            </a>
          </li>
          <li>
            <Link to="/">Voltar ao site</Link>
          </li>
        </ul>
      </div>
      <div className="ft-bottom">
        <p>© {new Date().getFullYear()} Young Family · Loja oficial · Luanda, Angola</p>
        <p>Preços em Kwanzas (Kz)</p>
        <p>
          Site por{' '}
          <a href="https://expressers.ao" target="_blank" rel="noreferrer">
            Expressers
          </a>
        </p>
      </div>
    </footer>
  )
}
