import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { llmsAtom } from "../state/models";
import { Model } from "../types";
import { useGetAllAPIModels } from "../services/apiService";
