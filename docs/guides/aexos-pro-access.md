# Como acessar o AEXOS Pro

O AEXOS Pro e as squads Pro ficam disponíveis apenas para usuários com entitlement ativo. O acesso normal é feito por autenticação de email e senha; a chave `PRO-XXXX-XXXX-XXXX-XXXX` continua existindo como caminho legado.

## Quem tem acesso

- Membros elegíveis do AEXOS Cohort Advanced.
- Usuários que já foram cadastrados como compradores/beneficiários Pro.
- Contas cujo email foi reconhecido pelo serviço de licença Pro.

Se o instalador responder que não encontrou acesso para o email, o problema é de entitlement ou conta, não de npm. Nesse caso, peça validação de acesso ao suporte/DevOps.

## Instalar e ativar

No projeto onde você quer usar o Pro:

```bash
npx -y -p @aexos-squads/core@latest aexos pro setup
```

O setup guiado oferece dois caminhos:

- Email e senha: caminho recomendado.
- License key: caminho legado para chaves `PRO-...`.

Em automação/CI, use variáveis de ambiente:

```bash
export AEXOS_PRO_EMAIL="seu-email@exemplo.com"
export AEXOS_PRO_PASSWORD="sua-senha"
npx -y -p @aexos-squads/core@latest aexos pro setup
```

Ou, para chave legada:

```bash
export AEXOS_PRO_KEY="PRO-XXXX-XXXX-XXXX-XXXX"
npx -y -p @aexos-squads/core@latest aexos pro setup
```

## Verificar o acesso

Depois de instalar:

```bash
npx -y -p @aexos-squads/core@latest aexos pro status
npx -y -p @aexos-squads/core@latest aexos pro features
npx -y -p @aexos-squads/core@latest aexos pro validate
```

Esses comandos verificam a licença, listam recursos Pro disponíveis e forçam uma revalidação online quando necessário.

## Squads Pro

As squads Pro são entregues pelo pacote Pro privado e sincronizadas pelo instalador para as superfícies locais suportadas pelo AEXOS. Depois da instalação, use os comandos de status/features acima para confirmar que o pacote Pro foi encontrado e ativado.

Se as squads não aparecerem depois de uma instalação bem-sucedida, rode:

```bash
npx -y -p @aexos-squads/core@latest aexos pro update
npm run sync:ide
```

## Recuperação de acesso

Para recuperar senha ou licença:

```bash
npx -y @aexos-squads/aexos-pro-cli@latest recover
```

Se o email comprado não for reconhecido, ou se a conta existir mas a ativação falhar, o fluxo operacional correto é acionar `@devops` com um destes comandos:

- `*pro-check-access` para consultar entitlement e conta.
- `*pro-request-reset` para disparar reset de senha.
- `*pro-resend-verification` para reenviar verificação de email.
- `*pro-access-grant` para conceder ou restaurar acesso com validação de API e installer.

## Erros comuns

- `No AEXOS Pro access found for this email.`: o email ainda não tem entitlement Pro ou foi digitado diferente do cadastro.
- `AEXOS Pro is not installed.`: rode `npx -y -p @aexos-squads/core@latest aexos pro setup` antes de status/validate.
- `Invalid key format`: a chave legada precisa seguir o formato `PRO-XXXX-XXXX-XXXX-XXXX`.
- Falha em CI sem prompt interativo: defina `AEXOS_PRO_EMAIL` + `AEXOS_PRO_PASSWORD` ou `AEXOS_PRO_KEY`.
- `Pro activation failed: Installed Pro artifact did not create node_modules/@aexos-squads/pro.`: bug em versões `5.2.5` e anteriores — corrigido a partir de `@aexos-squads/core@5.2.6`. Atualize com `npx -y -p @aexos-squads/core@latest aexos install`. Se persistir, veja [installation-troubleshooting.md → Issue 10](installation-troubleshooting.md#issue-10-pro-activation-failed-installed-pro-artifact-did-not-create-node_modulesaexos-squadspro) para o kit de recuperação completo.

Nunca compartilhe senha, token ou license key completa em issues públicas. Para suporte, envie apenas o email e o sintoma.
