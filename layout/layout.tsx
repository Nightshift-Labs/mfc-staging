import { LayoutProps } from '../interfaces/LayoutProps';

import styles from '../styles/components/page.module.scss'

const Layout = ({ children }: LayoutProps) => {

  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

export default Layout;