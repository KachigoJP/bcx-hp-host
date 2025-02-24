import React from 'react';
import Layout from '@components/layout';
import PageTitle from '@components/common/PageTitle';
import Error from '@components/containers/404';

interface PageProps {}

const Page404: React.FC<PageProps> = (props) => {
    return (
        <Layout>
            <PageTitle pageTitle={'404'} pagesub={'404'}/> 
            <Error/>
        </Layout>
    );
};

export default Page404;


