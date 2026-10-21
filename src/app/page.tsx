import { DeliveryMap } from "@/components/modules/DeliveryMap/DeliveryMap";
import { Hero } from "@/components/modules/Hero/Hero";
import { MenuCatalog } from "@/components/modules/MenuCatalog/MenuCatalog";
import { OrderCart } from "@/components/modules/OrderCart/OrderCart";
import { SousVideProcess } from "@/components/modules/SousVideProcess/SousVideProcess";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <MenuCatalog />
        <OrderCart />
        <SousVideProcess />
        <DeliveryMap />
      </main>
      <Footer />
    </div>
  );
}
