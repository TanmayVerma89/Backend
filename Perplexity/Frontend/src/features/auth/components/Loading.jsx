import '../styles/loading.css'

const Loading = () => {
    return (
        <main className="app-loading" aria-live="polite" aria-busy="true">
            <section className="app-loading__content" aria-label="Loading Perplexity">
                <div className="app-loading__orbit" aria-hidden="true">
                    <span className="app-loading__ring app-loading__ring--outer" />
                    <span className="app-loading__ring app-loading__ring--inner" />
                    <span className="app-loading__spark app-loading__spark--one" />
                    <span className="app-loading__spark app-loading__spark--two" />
                    <span className="app-loading__spark app-loading__spark--three" />
                    <span className="app-loading__mark">✦</span>
                </div>

                <div className="app-loading__brand">
                    <span>Perplexity</span>
                    <span className="app-loading__status">Preparing your workspace</span>
                </div>

                <div className="app-loading__progress" aria-hidden="true">
                    <span />
                </div>
                <p className="app-loading__message">Finding the thread of your next idea.</p>
            </section>
        </main>
    )
}

export default Loading
