import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import React from 'react';
import Footer from 'src/components/common/Footer';
import ProductItem from 'src/components/common/ProductItem';
import { MainPageAppBarLeft, MainPageAppBarRight } from 'src/components/common/Stackflow';
import { ProductInterface } from 'src/schemas/Product';
import { getProductList } from 'src/services/product';
import { useFlow } from 'src/utils/stackflow';
import { ItemsWrapper } from './styled';

const MainPage: ActivityComponentType = () => {
  const { push } = useFlow();

  const goToDetailPage = (id: number) => {
    push('DetailPage', { id: id.toString() });
  };

  const [products, setProducts] = React.useState<ProductInterface[]>([]);
  const loadProducts = async () => {
    const { data } = await getProductList();
    setProducts(data);
  };

  React.useEffect(() => {
    loadProducts();
  }, []);

  console.log(products);
  return (
    <AppScreen appBar={{ appendLeft: MainPageAppBarLeft, appendRight: MainPageAppBarRight }}>
      <div>s</div>
      <ItemsWrapper>
        {products.map((products) => {
          return <ProductItem key={products.id} item={products} onClickItem={() => goToDetailPage(products.id)} />;
        })}
      </ItemsWrapper>
      <Footer />
    </AppScreen>
  );
};

export default MainPage;
