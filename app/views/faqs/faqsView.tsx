import { Accordion } from "@mantine/core"
import { LinksFunction } from "@remix-run/node"
import styles from "./styles.css"
import Remark, { links as RemarkLinks } from "~/components/shared/Remark"
import Text, { links as TextLinks } from "~/components/shared/Text"
import { useTranslate } from "~/context/TranslateContext"
import { questions } from "~/models/cms/sdk"

/* c8 ignore start */
export const links: LinksFunction = () => {
  return [...RemarkLinks(), ...TextLinks(), { rel: "stylesheet", href: styles }]
}
/* c8 ignore emd */

type FaqsViewProps = {
  categories: {
    [key: string]: questions[]
  } | null
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
        Object.entries(categories).map(
          ([key, value]: [key: string, value: questions[]]) => (
            <div key={key} className="faqs-category">
              <h2 className="faqs-category-title">
                {value[0].category?.translations
                  ? value[0].category?.translations[0]?.display
                  : ""}
              </h2>
              <Accordion className="faqs">
                {value.map((item) => (
                  <Accordion.Item
                    key={item.id}
                    className="faqs-item"
                    iconPosition="right"
                    label={item.translations ? item.translations[0]?.question : ""}
                  >
                    {item.translations && item.translations[0]?.answer && (
                      <Remark>{item.translations[0].answer ?? ""}</Remark>
                    )}
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ),
        )}
    </div>
  )
}
