import { PrismicDate } from "../prismic-types";
const dateFormatter = Intl.DateTimeFormat('en-Gb', {
    weekday: "long",
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

export default function(prismicDateString: string | null) : string {
    const date = PrismicDate(prismicDateString);
    return dateFormatter.format(date);
}