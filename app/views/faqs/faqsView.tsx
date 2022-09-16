import { Accordion, AccordionItem } from "@mantine/core"
import { LinksFunction } from "@remix-run/node"
import styles from "./styles.css"
import Remark, { links as RemarkLinks } from "~/components/shared/Remark"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import { Question } from "~/models/cms/types"

/* c8 ignore start */
export const links: LinksFunction = () => {
  return [...RemarkLinks(), ...TextLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore emd */

type FaqsViewProps = {
  categories: {
    [key: string]: Question[]
  }
}

export default function FaqsView({ categories }: FaqsViewProps) {
  const {
    t: { faq },
  } = useTranslate()

  return (
    <div className="pokt-faqs-view">
      <h1 className="faqs-title">
        {faq.title}{" "}
        <Text className="color-secondary-main" component="span">
          {faq.subtitle}
        </Text>
      </h1>
      {categories &&
        Object.entries(categories).map(([key, value]) => (
          <div key={key} className="faqs-category">
            <h2 className="faqs-category-title">{key.split("_")[1].replace("-", " ")}</h2>
            <Accordion className="faqs">
              {(value as Question[]).map((item) => (
                <AccordionItem
                  key={item.id}
                  className="faqs-item"
                  iconPosition="right"
                  label={item.question}
                >
                  <Remark>{item.answer}</Remark>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
    </div>
  )
}
