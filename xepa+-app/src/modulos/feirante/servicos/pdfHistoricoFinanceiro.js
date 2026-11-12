import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatarData } from '@/compartilhado/servicos/datas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import { ROTULOS_TIPO } from './historicoFinanceiro.js';

const VERDE = [24, 85, 47];
const MARGEM = 14;

function usarCorVerde(pdf) {
  pdf.setTextColor(VERDE[0], VERDE[1], VERDE[2]);
}

export function montarPdfHistorico({ nomeFeirante, periodo, registros, totais }) {
  const pdf = new jsPDF();

  usarCorVerde(pdf);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Histórico financeiro - Xepa+', MARGEM, 20);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(113, 109, 109);
  pdf.text(`Feirante: ${nomeFeirante}`, MARGEM, 29);
  pdf.text(`Período: ${periodo}`, MARGEM, 35);

  autoTable(pdf, {
    startY: 42,
    margin: { left: MARGEM, right: MARGEM },
    head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Feira', 'Valor']],
    body: registros.map((registro) => [
      formatarData(registro.data),
      registro.descricao,
      registro.categoria,
      ROTULOS_TIPO[registro.tipo],
      registro.feira || '-',
      formatarMoeda(registro.valor),
    ]),
    headStyles: { fillColor: VERDE, textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 2.5, textColor: [22, 20, 20] },
    alternateRowStyles: { fillColor: [244, 248, 236] },
    columnStyles: { 5: { halign: 'right', cellWidth: 28 } },
  });

  let y = pdf.lastAutoTable.finalY + 12;
  const larguraPagina = pdf.internal.pageSize.getWidth();

  // Mantém o resumo inteiro na mesma página
  if (y + 28 > pdf.internal.pageSize.getHeight()) {
    pdf.addPage();
    y = 20;
  }

  const linhas = [
    { rotulo: 'Total de lucros', valor: totais.lucros, estilo: 'normal' },
    { rotulo: 'Total de despesas', valor: totais.gastos, estilo: 'normal' },
    { rotulo: 'Saldo do período', valor: totais.saldo, estilo: 'bold' },
  ];

  pdf.setFontSize(11);
  usarCorVerde(pdf);

  for (const linha of linhas) {
    pdf.setFont('helvetica', linha.estilo);
    pdf.text(linha.rotulo, MARGEM, y);
    pdf.text(formatarMoeda(linha.valor), larguraPagina - MARGEM, y, { align: 'right' });
    y += 7;
  }

  return pdf;
}

export function baixarPdfHistorico(dados) {
  montarPdfHistorico(dados).save('historico-financeiro.pdf');
}
