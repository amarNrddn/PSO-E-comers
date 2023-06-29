import React from 'react'
import { useRouter } from 'next/router'
import { MENU_LISTS } from './constants'
import styles from "./index.module.css"

export const Layout = ({ children }) => {
  const router = useRouter()

  const hendeleOnchangePage = (path) => {
    router.push(path)
  }

  return (
    <main className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebar__nav}>
          <ul>
            {MENU_LISTS.map((item, i) => {
              return (
                <li key={i}
                  className={router.pathname === item.path ? styles.active : ''}
                  onClick={() => hendeleOnchangePage(item.path)}
                >
                  {item.name}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <section className={styles.conten}>{children}</section>
    </main>
  )
}

export default Layout