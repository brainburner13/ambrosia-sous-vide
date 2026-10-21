import { DeliveryMap } from "@/components/modules/DeliveryMap/DeliveryMap";
import { Hero } from "@/components/modules/Hero/Hero";
import { MenuCatalog } from "@/components/modules/MenuCatalog/MenuCatalog";
import { OrderCart } from "@/components/modules/OrderCart/OrderCart";
import { SousVideProcess } from "@/components/modules/SousVideProcess/SousVideProcess";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { cookies } from "next/headers";
import { parseTheme, THEME_COOKIE } from "@/utils/theme";
import styles from "./page.module.css";

export default async function HomePage() {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <div className={styles.page}>
      <Header theme={theme} />
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
