export interface ControleDTO {
    id:number,
    data: string,
    inicio: string | null | undefined,
    termino: string | null | undefined,
    ano: string,
    assunto: string,
    destino: string,
    nomeUsuario: string,
    portaria:string,
    processoDoc: string,
    observacoes: string,
}