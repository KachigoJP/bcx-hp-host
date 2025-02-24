import React from 'react';
import PageTitle from '@components/common/PageTitle';
import Footer from '@components/layout/Footer';
import Scrollbar from '@components/common/scrollbar';
import Error from '../../components/404';

interface StoryPageProps {}

const StoryPage: React.FC<StoryPageProps> = (props) => {
    return (
        <div>
            <PageTitle pageTitle={'404'} pagesub={'404'}/> 
            <Error/>
            <Footer ftClass={'wpo-site-footer-s2'}/>
            <Scrollbar/>
        </div>
    );
};

export default StoryPage;


