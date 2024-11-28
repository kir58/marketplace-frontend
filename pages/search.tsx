import { GetServerSideProps } from 'next';
import { allSettled, fork, serialize } from 'effector';
import { searchProductsTriggered } from '@shared/widgets/layout';

export { SearchPage as default } from '../src/pages/search';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const scope = fork();

  const keyword = (context.query.keyword as string) || '';

  await allSettled(searchProductsTriggered, { scope, params: keyword });

  const values = serialize(scope);

  return {
    props: {
      values,
    },
  };
};
