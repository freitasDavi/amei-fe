import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from "recharts"

const data = [
    {
        name: 'Janeiro',
        Faturamento: 200,
    },
    {
        name: 'Favereiro',
        Faturamento: 3000,
    },
    {
        name: 'Março',
        Faturamento: 2000,
    },
    {
        name: 'Abril',
        Faturamento: 2780,
    },
    {
        name: 'Maio',
        Faturamento: 1890,
    },
    {
        name: 'Junho',
        Faturamento: 2390,
    },
    {
        name: 'Julho',
        Faturamento: 3490,
    },
];


export function GraficoHome() {
    return (
        <div className="w-full max-h-[500px] flex flex-col gap-4 p-4">
            <h2 className="text-xl text-primary-logo font-semibold">Faturamentos</h2>
            <ResponsiveContainer width="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="Faturamento" fill="#1C9AEA" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>

        </div>

    )
}