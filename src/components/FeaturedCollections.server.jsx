import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
export default function FeaturedCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <section className="collection">
      <h2 className="collectionTitle">
        Collections
      </h2>
      <div className="collectionList">
        {collections.nodes.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="collectionItem">
                {collection?.image && (
                  <Image
                    className="collectionImg"
                    width={"100%"}
                    height={336}
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    src={collection.image.url}
                  />
                )}
                <h2 className="collectionTitle">
                  {collection.title}
                </h2>
                <h3 className="collectionID">
                    {collection.id}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
const QUERY = gql`
  query FeaturedCollections {
    collections(first: 10, query: "collection_type:smart", sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

console.log(QUERY)