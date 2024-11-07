import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import tractianLogo from '@/public/logo tractian.png'
import goldIcon from '@/public/gold.png'

import * as Styled from './styles'
import Button from '@/components/atoms/Button'
import { ICompany } from '@/store/types'
import { atom, useAtom } from 'jotai'

export const SelectedCompanyAtom = atom<ICompany | null>(null)

function Header() {
  const [selectedCompany, setSelectedCompanyId] = useAtom(SelectedCompanyAtom)

  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('https://fake-api.tractian.com/companies');
      const response = await data.json() as ICompany[];

      setCompanies(response);
    })();
  }, []);

  return (
    <Styled.Container>
      <Image src={tractianLogo} alt="Tractian" />

      <Styled.Companies>
        {companies && companies.map((company) => (
          <Button
            key={company.id}
            name={`${company.name} Unit`}
            onClick={() => setSelectedCompanyId(company)}
            icon={goldIcon}
            isSelected={selectedCompany?.id === company.id}
            theme='blue'
          />
        ))}
      </Styled.Companies>
    </Styled.Container>
  )
}

export default Header