import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
    return (
        <Layout>
            <div>
                <h1
                    css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
                >
                    gatsbyjs 使用教程
                </h1>
                {data.allMarkdownRemark.edges.map(({ node }) => (

                    <div key={node.id}>
                        <Link
                            to={node.fields.slug}
                            css={css`
                text-decoration: none;
                color: inherit;
              `
                            }
                        >
                            <h3
                                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
                            >
                                {node.frontmatter.title}{" "}
                                <span
                                    css={css`
                    color: #bbb;
                  `}
                                >
                </span>
                            </h3>


                            <p>{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fileAbsolutePath] }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`