import { Footer, Header } from "../component/layout";

export default function ExternalPageLayout({children}: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )
}