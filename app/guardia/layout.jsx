import Header from '../components/Header';
export default function Layout({ children }) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <section className="flex h-full w-full p-4">
            {children}
        </section>
      </div>
    );
  }