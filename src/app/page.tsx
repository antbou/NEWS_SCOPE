import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

console.log("Server side rendering");

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </main>
  )
}
