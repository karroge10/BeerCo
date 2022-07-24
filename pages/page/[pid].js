import MainContainer from "../../components/MainContainer";
import Pagination from "../../components/Pagination";
import Link from 'next/link';

const Items = ({items, pageNumber }) => {
    if (items.error){
        return (<Custom404 />)
    } else {
        return (
            <MainContainer pageName={"Beer Selection"}>
                <h1>Beer Selection</h1>
                <ul>
                    {items.map((item) => 
                        <li key={item.id}>
                            <Link href={`/items/${item.id}`}>
                                <a>{item.name}</a>
                            </Link>
                        </li>)}
                </ul>
                <Pagination pageNumber={pageNumber}/>
            </MainContainer>
        )
    };
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.pid;

    if (!pageNumber || pageNumber < 1 || pageNumber > 13) {
        return {
            props: {
                items: [],
                pageNumber: 1,
            },
        };
    }

    const response = await fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}`)
    const items = await response.json();

    return {
        props: {
            items: items,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};

export default Items;