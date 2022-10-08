import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from '../src/Components/Navbar/Navbar'
import styles from '../styles/Home.module.css'

const New = () => {
    const [user, setUser] = useState({})

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')))
        } else {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>New Article</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <Navbar user={user} />

            <main className={styles.main}>
                <div className={styles.grid}>
                    <div>
                        <input id="title" name="title" className={styles.textBox} onChange={(e) => {
                            setTitle(e.target.value)
                        }} placeholder="Title" required />
                        <input id="url" name="url" className={styles.textBox} onChange={(e) => {
                            setUrl(e.target.value)
                        }} placeholder="Url" required />
                        <input id="imageUrl" name="imageUrl" className={styles.textBox} onChange={(e) => {
                            setImageUrl(e.target.value)
                        }} placeholder="Image  Url" required />
                        <textarea id="description" name="description" className={styles.textBox} onChange={(e) => {
                            setDescription(e.target.value)
                        }} rows={5} placeholder="Description" required></textarea>
                        <textarea id="content" name="content" className={styles.textBox} onChange={(e) => {
                            setContent(e.target.value)
                        }} rows={20} placeholder="Content" required></textarea>
                        <button onClick={async () => {
                            const article = {
                                title: title,
                                description: description,
                                imageUrl: imageUrl,
                                url: url,
                                content: content,
                                email: user.email
                            }
                            const request = await fetch('/api/createArticle', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(article)
                            })

                            if (request.status === 200) {
                                const response = await request.json()
                                setMessage(response.success)
                            } else {
                                const response = await request.json()
                                setMessage(response.error)
                            }
                        }} className={styles.submit}>Publish</button>
                    </div>
                    <p>{message}</p>
                </div>
            </main>
        </div >
    )
}

export default New