import Link from 'next/link';
import React from 'react';

interface PageTitleProps {
    pageTitle: string;
    pagesub: string;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
    return (
        <div className="wpo-breadcumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-breadcumb-wrap">
                            <h2>{props.pageTitle}</h2>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><span>{props.pagesub}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
