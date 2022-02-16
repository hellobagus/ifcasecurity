import FinanceScreens, { WalletTabScreens } from "./finance";
import NewsScreens, { NewsTabScreens } from "./news";
import ECommerceScreens, { ECommerceTabScreens } from "./eCommerce";
import ShareScreens from "./share";
import ModalScreens from "./modal";
import FryptoScreens from "./crypto";

const AllScreens = {
    ...ShareScreens,
    ...FinanceScreens,
    ...NewsScreens,
    ...ECommerceScreens,
    ...FryptoScreens,
}

export {
    WalletTabScreens,
    FryptoScreens,
    FinanceScreens,
    NewsScreens,
    ECommerceScreens,
    ShareScreens,
    ModalScreens,
    AllScreens,
    NewsTabScreens,
    ECommerceTabScreens
}

