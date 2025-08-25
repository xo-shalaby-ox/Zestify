import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full p-5"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-slate-200 text-xl font-bold">
          About US
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ul className="text-gray-300 text-sm flex flex-col gap-2">
            <li className="text-lg font-medium">FAQ</li>
            <li className="text-lg font-medium">Contact</li>
            <li className="text-lg font-medium">Returns</li>
            <li className="text-lg font-medium">Blog</li>
            <li className="text-lg font-medium">Shipping</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-slate-200 text-xl font-bold">
          Customer Support
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ul className="text-gray-300 text-lg flex flex-col gap-2">
            <li className="text-lg font-medium">Affiliates</li>
            <li className="text-lg font-medium">Apply Pay Payments</li>
            <li className="text-lg font-medium">Returns</li>
            <li className="text-lg font-medium">Returns Policy</li>
            <li className="text-lg font-medium">Returns</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-slate-200 text-xl font-bold">
          Follow US
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ul className="text-gray-300 text-lg mt-3 flex flex-col gap-2">
            <li className="text-lg font-medium flex justify-start items-center gap-x-3">
              <i className="fa fa-brands fa-facebook-f"></i>
              <span>Facebook</span>
            </li>
            <li className="text-lg font-medium flex items-start gap-x-3">
              <i className="fa fa-brands fa-instagram"></i>
              <span>Instagram</span>
            </li>
            <li className="text-lg font-medium flex items-start gap-x-3">
              <i className="fa fa-brands fa-twitter"></i>
              <span>Twitter</span>
            </li>
            <li className="text-lg font-medium flex items-start gap-x-3">
              <i className="fa fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
