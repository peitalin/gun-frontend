import { UserPrivate, StorePrivate, Dealers, Order, User_Licenses} from "typings/gqlTypes";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    // type: response.headers.get('content-type') || defaultType,
    type: "image/jpeg",
  });
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


// define a generatePDF function that accepts a tickets argument
export const generatePDF = async ({
  buyer,
  sellerStore,
  sellerLicense,
  dealer,
  order,
}: {
  buyer: UserPrivate,
  sellerStore: StorePrivate,
  sellerLicense: User_Licenses,
  dealer: Dealers,
  order: Order,
}) => {
  // initialize jsPDF
  const doc = new jsPDF({ unit: "mm" });

  const date = Date().split(" ");
  const dateStr = `${date[2]}-${date[1]}-${date[3]}`

  // get Police logo and add it to PDF
  const file = await getFileFromUrl('/img/form10badge.png', 'form10badge.png');
  let imgData = `${await toBase64(file)}`
  doc.addImage(imgData, 'JPEG', 10, 10, 30, 30)

  // Audit ID number on header
  doc.setFont('courier')
  doc.setFontSize(10)
  doc.text("Page: 1 of 1", 150, 20);
  doc.text(`AUDIT FORM No. ${order?.id}-${order?.productId}`, 125, 24);

  let product = order?.product;

  let sellerPhoneNumber = !!sellerStore?.user?.phoneNumber?.number
    ? `${sellerStore?.user?.phoneNumber?.countryCode} ${sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let dealerAddress2 = `${dealer?.postCode} ${dealer?.city} ${dealer?.state}`
  let dealerPhoneNumber = !!dealer?.user?.phoneNumber?.number
    ? `${dealer?.user?.phoneNumber?.countryCode} ${dealer?.user?.phoneNumber?.number}`
    : "-"
  let dealerSignatoryName = (dealer?.user?.firstName && dealer?.user?.lastName)
    ? `${dealer?.user?.firstName} ${dealer?.user?.lastName}`
    : ""


  // @ts-ignore
  doc.autoTable({
    margin: { top: 50 },
    theme: "plain",
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'center',
      font: "courier",
      fontStyle: "bold",
      fontSize: 14,
      cellPadding: 0,
    },
    body: [
      [{
          content: 'Form 10',
          colSpan: 1,
          rowSpan: 1,
      }],
      [{
          content: 'QUEENSLAND',
          colSpan: 1,
          rowSpan: 1,
      }],
      [{
          content: 'Weapons Act 1990',
          colSpan: 1,
          rowSpan: 1,
      }],
    ],
  })

  // @ts-ignore
  doc.autoTable({
    margin: { top: 50 },
    theme: "plain",
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'center',
      font: "courier",
      fontStyle: "bold",
      fontSize: 16,
      cellPadding: 0,
    },
    body: [
      [{
          content: 'NOTICE OF ACQUISITION OR DISPOSAL OF WEAPON',
          colSpan: 1,
          rowSpan: 1,
      }],
    ],
  })

  // @ts-ignore
  doc.autoTable({
    margin: { top: 60 },
    theme: "plain",
    // styles: { fillColor: [255, 0, 0] },
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'left',
      font: "courier",
      // fontStyle: "bold",
      fontSize: 11,
      cellPadding: 0,
    },
    tableWidth: 150,
    body: [
      [
        {
          content: "Dealers Name",
          colSpan: 1,
          rowSpan: 1,
          styles: { cellWidth: 40 },
        },
        {
          content: dealer?.name,
          colSpan: 1,
          rowSpan: 1,
        },
      ],
      ["Address", dealer?.address ?? dealerAddress2],
      ["License No.", dealer?.licenseNumber],
      ["Phone No.", dealerPhoneNumber],
    ],
  })

  // @ts-ignore
  doc.autoTable({
    margin: { top: 50 },
    theme: "plain",
    // head: [['Name', 'Email', 'Country']],
    body: [
      [
        {
          content: 'ACQUIRED FROM',
          colSpan: 1,
          rowSpan: 1,
          styles: {
            halign: 'left',
            font: "courier",
            fontStyle: "bold",
            fontSize: 16,
            cellPadding: 0,
          },
        },
        {
          content: `On Date: ${date[2]}/${date[1]}/${date[3]}`,
          colSpan: 1,
          rowSpan: 1,
          styles: {
            halign: 'right',
            font: "courier",
            // fontStyle: "bold",
            fontSize: 10,
            cellPadding: 0,
          },
        }
      ],
    ],
  })

  // @ts-ignore
  doc.autoTable({
    margin: { top: 60 },
    theme: "plain",
    // styles: { fillColor: [255, 0, 0] },
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'left',
      font: "courier",
      // fontStyle: "bold",
      fontSize: 11,
      cellPadding: 0,
    },
    tableWidth: 150,
    body: [
      [
        {
          content: "Name",
          colSpan: 1,
          rowSpan: 1,
          styles: { cellWidth: 40 },
        },
        {
          content: `${sellerStore?.user?.firstName} ${sellerStore?.user?.lastName}`,
          colSpan: 1,
          rowSpan: 1,
        },
      ],
      ["Phone No.", sellerPhoneNumber],
      ["License No.", `${sellerLicense?.licenseNumber}`],
      ["Address", sellerStore?.website || "-"],
    ],
  })

  // @ts-ignore
  doc.autoTable({
    margin: { top: 60 },
    theme: "plain",
    // styles: { fillColor: [255, 0, 0] },
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'left',
      font: "courier",
      // fontStyle: "bold",
      fontSize: 11,
      cellPadding: 0,
    },
    tableWidth: 150,
    body: [
      [
        {
          content: "Category",
          colSpan: 1,
          rowSpan: 1,
          styles: { cellWidth: 40 },
        },
        {
          content: product?.category?.name,
          colSpan: 1,
          rowSpan: 1,
        },
      ],
      ["Action", product?.currentSnapshot?.actionType],
      ["Make", product?.currentSnapshot?.make],
      ["Model", product?.currentSnapshot?.model],
      ["Serial No.", product?.currentSnapshot?.serialNumber],
      ["Caliber", product?.currentSnapshot?.caliber],
      ["M/C", product?.currentSnapshot?.magazineCapacity || "-"],
      ["B/L (mm)", product?.currentSnapshot?.barrelLength || "-"],
      [],
    ],
  })


  // @ts-ignore
  doc.autoTable({
    margin: { top: 60 },
    theme: "plain",
    // styles: { fillColor: [255, 0, 0] },
    // head: [['Name', 'Email', 'Country']],
    styles: {
      halign: 'left',
      font: "courier",
      // fontStyle: "bold",
      fontSize: 11,
      cellPadding: 3,
    },
    tableWidth: 150,
    body: [
      [
        {
          content: "Signature of Dealer",
          colSpan: 1,
          rowSpan: 1,
          styles: { cellWidth: 50 },
        },
        {
          content: "",
          colSpan: 1,
          rowSpan: 1,
        },
      ],
      ["Name of Signatory", dealerSignatoryName],
      ["Date Forwarded to Weapons Licensing", ""],
    ],
  })

  // draw signature lines
  doc.setLineWidth(0.1)
  doc.setDrawColor(25, 25, 25) // draw black lines
  doc.line(66, 205, 140, 205)
  doc.line(66, 216, 140, 216)
  doc.line(66, 230, 140, 230)


  // we define the name of our PDF file.
  doc.save(`form10_GM_${order?.id}_${dateStr}.pdf`);
};
